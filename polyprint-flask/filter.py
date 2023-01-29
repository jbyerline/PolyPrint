import logging


class NoRunningFilter(logging.Filter):
    def filter(self, record):
        return not ("maximum number of running instances reached" in record.msg)
