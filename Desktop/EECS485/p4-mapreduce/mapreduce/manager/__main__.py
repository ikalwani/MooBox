"""MapReduce framework Manager node."""
import os
import tempfile
import logging
import json
import time
import click
import threading 
import mapreduce.utils
import socket
import sys 
from queue import Queue


# Configure logging
LOGGER = logging.getLogger(__name__)


class Manager:
    """Represent a MapReduce framework Manager node."""
    
# TCP AND UDP socket for manager and worker to communicate 
# Basically - i think we need 3 threads 

    def __init__(self, host, port):
        """Construct a Manager instance and start listening for messages."""
        # need to initialize manager w host and port
        # instance data -> making it accessble throughout class 
        self.host = host 
        self.port = port 
        # store connected workers 
        self.workers = []
        # handle incoming messages 
        self.message_queue = Queue()
        
        # first create socket to habdle incoming messages 
        self.setup_socket()
        
        # start thread to handle incoming worker connections - TCP
        accept_thread = threading.Thread(target=self.accept_workers)
        accept_thread.start()
        
        LOGGER.info(
            "Starting manager host=%s port=%s pwd=%s",
            host, port, os.getcwd(),
        )

    def setup_socket(self):
        """create socket to listen for incoming connections"""
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server_socket.bind((self.host, self.port))
        self.server_socket.listen()

        LOGGER.info("Starting manager host=%s port=%s pwd=%s", self.host, self.port, os.getcwd())
        self.server_socket.settimeout(1)
    
    def accept_workers(self):
        """accept incoming connections from workers"""
        while True:
            worker_socket, addr = self.server_socket.accept()
            LOGGER.info(f"Accepted connection from {addr}")
            self.workers.append(worker_socket)
            self.worker_handler(worker_socket)
            
    def worker_handler(self, worker_socket):
        """handle communication with a connected worker"""
        while True:
            # receive and process messages from the worker
            data = worker_socket.recv(4096).decode()
            if not data:
                # worker disconnected
                LOGGER.info("Worker disconnected")
                self.workers.remove(worker_socket)
                worker_socket.close()
                break

            # process received data
            self.message_queue.put(data)
    
    def shutdown(self):
        """send a shutdown message to all connected workers"""
        shutdown_message = {"message_type": "shutdown"}
        for worker_socket in self.workers:
            try:
                worker_socket.send(json.dumps(shutdown_message).encode())
            except Exception as e:
                LOGGER.error("Failed to send shutdown message to worker: %s", str(e))
            finally:
                # close the worker socket
                worker_socket.close()
        sys.exit(0)
    
    def start(self):
        try:
            while True:
                command = input("Enter 'shutdown' to initiate a server shutdown: ")
                if command.strip() == 'shutdown':
                    self.shutdown()
        except KeyboardInterrupt:
            LOGGER.info("Manager interrupted.")
            self.shutdown()


@click.command()
@click.option("--host", "host", default="localhost")
@click.option("--port", "port", default=6000)
@click.option("--logfile", "logfile", default=None)
@click.option("--loglevel", "loglevel", default="info")
@click.option("--shared_dir", "shared_dir", default=None)
def main(host, port, logfile, loglevel, shared_dir):
    """Run Manager."""
    tempfile.tempdir = shared_dir
    if logfile:
        handler = logging.FileHandler(logfile)
    else:
        handler = logging.StreamHandler()
    formatter = logging.Formatter(
        f"Manager:{port} [%(levelname)s] %(message)s"
    )
    handler.setFormatter(formatter)
    root_logger = logging.getLogger()
    root_logger.addHandler(handler)
    root_logger.setLevel(loglevel.upper())
    Manager(host, port)


if __name__ == "__main__":
    main()
