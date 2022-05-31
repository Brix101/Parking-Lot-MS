# detect
import detect_cars as dc
import detect_motorbikes as dm

class DetectionClass():
    def __init__(self, block, type, score, bounds):
        self.block = block
        self.type = type
        self.score = score
        self.bounds = bounds

def detected_vehicles_per_frame(b, frame):
    # get frame from python server
    # detect the frame using detect_cars.py and detect_motorbikes.py
    # return: [type: str = car | motorbike | "", bounds of detected = [0,0,0,0] ] 
    # print("Started detecting vehicles per frame...")
    # m_scores, m_boxes = dm.detect(frame)
    # print(type(m_scores))
    # detected_vehicles = []
    # for i in range(0, len(m_scores)):
    #     detected_vehicle = DetectionClass(type="car", score=m_scores[i], bounds=m_boxes[i])
    #     detected_vehicles.append(detected_vehicle)
    
    detected_vehicles = []
    c_scores, c_boxes = dc.detect(frame)
    for i in range(0, len(c_scores)):
        detected_car = {
            "block": b,
            "type": "car",
            "score": c_scores[i],
            "bounds": c_boxes[i],
            "frame": frame
        }
        detected_vehicles.append(detected_car)
    
    m_scores, m_boxes = dm.detect(frame)
    for i in range(0, len(m_scores)):
        detected_motorbike = {
            "block": b,
            "type": "motorbike",
            "score": m_scores[i],
            "bounds": m_boxes[i],
            "frame": frame
        }
        detected_vehicles.append(detected_motorbike)
    
    return detected_vehicles
