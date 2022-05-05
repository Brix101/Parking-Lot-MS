from cgitb import handler
import logging

logging.basicConfig(level=logging.INFO, filename="logs/log.log", filemode="w",
                    format="%(asctime)s - %(levelname)s: %(message)s")

logger = logging.getLogger("name")
