from logging.config import dictConfig
import logging
from config.logger_config import LogConfig

dictConfig(LogConfig().dict())

# logging.basicConfig(level=logging.DEBUG, filename="logs/log.log", filemode="w",
#                     format="%(levelname)s | %(asctime)s | %(message)s")

logger = logging.getLogger("name")

