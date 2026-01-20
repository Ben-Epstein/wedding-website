#!/usr/bin/env python3
"""Simple HTTP server with range request support for video seeking."""

import os
import re
from http.server import HTTPServer, SimpleHTTPRequestHandler

class RangeHTTPRequestHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            return super().send_head()

        if not os.path.exists(path):
            self.send_error(404, "File not found")
            return None

        file_size = os.path.getsize(path)
        range_header = self.headers.get('Range')

        if range_header:
            # Parse range header
            match = re.match(r'bytes=(\d*)-(\d*)', range_header)
            if match:
                start = int(match.group(1)) if match.group(1) else 0
                end = int(match.group(2)) if match.group(2) else file_size - 1

                if start >= file_size:
                    self.send_error(416, "Range not satisfiable")
                    return None

                end = min(end, file_size - 1)
                content_length = end - start + 1

                self.send_response(206)
                self.send_header("Content-Type", self.guess_type(path))
                self.send_header("Content-Length", content_length)
                self.send_header("Content-Range", f"bytes {start}-{end}/{file_size}")
                self.send_header("Accept-Ranges", "bytes")
                self.end_headers()

                f = open(path, 'rb')
                f.seek(start)
                return _RangeFile(f, content_length)

        # No range requested - serve normally but indicate we accept ranges
        self.send_response(200)
        self.send_header("Content-Type", self.guess_type(path))
        self.send_header("Content-Length", file_size)
        self.send_header("Accept-Ranges", "bytes")
        self.end_headers()
        return open(path, 'rb')

class _RangeFile:
    """Wrapper to read only a portion of a file."""
    def __init__(self, f, length):
        self.f = f
        self.remaining = length

    def read(self, size=-1):
        if self.remaining <= 0:
            return b''
        if size < 0 or size > self.remaining:
            size = self.remaining
        data = self.f.read(size)
        self.remaining -= len(data)
        return data

    def close(self):
        self.f.close()

if __name__ == "__main__":
    port = 8080
    server = HTTPServer(("", port), RangeHTTPRequestHandler)
    print(f"Serving on http://localhost:{port}")
    server.serve_forever()
