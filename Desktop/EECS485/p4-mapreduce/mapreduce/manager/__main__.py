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

    def __init__(self, host, port):
        """Construct a Manager instance and start listening for messages."""
        # need to initialize manager w host and port
        # instance data -> making it accessble throughout class 
        self.host = host 
        self.port = port 
        # store connected workers 
        self.workers = []
        self.shutdown = False
        # handle incoming messages 
        # MAYBE USE LIST []
        self.message_queue = Queue()
        accept_thread = threading.Thread(target=self.socket)
        accept_thread.start()

        LOGGER.info(
            "Starting manager host=%s port=%s pwd=%s",
            host, port, os.getcwd(),
        )
    
    def socket(self):
        """create socket to listen for incoming connections"""
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

        self.sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.sock.bind((self.host, self.port))
        self.sock.listen()
        self.sock.settimeout(1)
        
        while True: 
            try:
                workersocket, address = self.sock.accept()
            except socket.timeout:
                continue
            print("Connection from", address[0])
            
            with workersocket:
                temp = []
                while True:
                    try:
                        data = workersocket.recv(4096)
                    except socket.timeout:
                        continue
                    if not data:
                        break
                    temp.append(data)
            message_bytes = b''.join(temp)
            message_str = message_bytes.decode("utf-8")

            try:
                message_dict = json.loads(message_str)
                if message_dict == {"message_type": "shutdown"}:
                    self.shutdown = True
                    self.message_queue.clear()
            except json.JSONDecodeError:
                continue
            self.message_queue.put(message_dict)
        
    def shutdown(self):
        """send a shutdown message to all connected workers"""
        
        for workersocket in self.workers:
            try:
                workersocket.send(json.dumps({"message_type": "shutdown"}).encode())
            except Exception as e:
                LOGGER.error("Failed to send shutdown message to worker: %s", str(e))
            finally:
                workersocket.close()
        # LOGGER.debug("TCP recv\n%s", json.dumps(message_dict, indent=2))


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
