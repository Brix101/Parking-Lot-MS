import os
import cv2 as cv
import numpy as np
import tensorflow as tf
from object_detection.utils import label_map_util
from object_detection.utils import visualization_utils as viz_utils
from object_detection.builders import model_builder
from object_detection.utils import config_util
from PIL import Image as im


WORKSPACE_PATH = 'Tensorflow/workspace'
TRAINING_DEMO_PATH = WORKSPACE_PATH + '/training_cars_only'
CUSTOM_MODEL_NAME = "my_model_1"
SCRIPTS_PATH = 'Tensorflow/scripts'
APIMODEL_PATH = 'Tensorflow/models'
ANNOTATION_PATH = TRAINING_DEMO_PATH+'/annotations'
IMAGE_PATH = TRAINING_DEMO_PATH+'/images'
MODEL_PATH = TRAINING_DEMO_PATH+'/models'
PRETRAINED_MODEL_PATH = TRAINING_DEMO_PATH+'/pre-trained-models'

CHECKPOINT_PATH = MODEL_PATH + '/' + CUSTOM_MODEL_NAME
CONFIG_PATH = MODEL_PATH+ '/' + CUSTOM_MODEL_NAME +'/pipeline.config'


configs = config_util.get_configs_from_pipeline_file(CONFIG_PATH)
detection_model = model_builder.build(model_config=configs['model'], is_training=False)

ckpt = tf.compat.v2.train.Checkpoint(model=detection_model)
ckpt.restore(os.path.join(CHECKPOINT_PATH, 'ckpt-6')).expect_partial()

@tf.function
def detect_fn(image):
  # print("Predicting image...")
  image, shapes = detection_model.preprocess(image)
  prediction_dict = detection_model.predict(image, shapes)
  detections = detection_model.postprocess(prediction_dict, shapes)
  return detections


category_index = label_map_util.create_category_index_from_labelmap(ANNOTATION_PATH + '/label_map.pbtxt')

def detect(frame):
  # print("Detecting cars...")
  image_np = np.array(frame)

  #input_tensor = im.fromarray(image_np)
  input_tensor = tf.convert_to_tensor(np.expand_dims(image_np, 0), dtype=tf.float32)
  #input_tensor = tf.convert_to_tensor(np.expand_dims(frame, 0), dtype=tf.float32)
  
  detections = detect_fn(input_tensor)

  num_detections = int(detections.pop('num_detections'))

  detections = {key:value[0, :num_detections].numpy() for key, value in detections.items()}
  detections['num_detections'] = num_detections
  detections['detection_classes'] = detections['detection_classes'].astype(np.int64)

  scores = detections['detection_scores']
  boxes = detections['detection_boxes']
  c_scores = []
  c_boxes = []
  for i in range(0, 99):
    score = scores[i]
    box = boxes[i]
    if score > .20:
      c_scores.append(score)
      c_boxes.append(box)

  
  return c_scores, c_boxes
  # per frame should have 100 boxes
  # # per box should have a score
  # total_frame_score = 0
  # for i in range(0, 99):
  #   score = scores[i]
  #   box = boxes[i]
  #   if score > .95:
  #     print(box, score)
  #     print(detections)

