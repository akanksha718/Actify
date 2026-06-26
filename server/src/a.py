from transformers import OwlViTProcessor, OwlViTForObjectDetection
from PIL import Image
import torch

model_name = "google/owlvit-base-patch32"

processor = OwlViTProcessor.from_pretrained(model_name)
model = OwlViTForObjectDetection.from_pretrained(model_name)

image = Image.open("OIP.jpg")

text_queries = [
    "pothole",
    "garbage",
    "broken road sign",
    "manhole",
    "streetlight damage"
]

inputs = processor(text=text_queries, images=image, return_tensors="pt")

outputs = model(**inputs)

target_sizes = torch.tensor([image.size[::-1]])
results = processor.post_process_object_detection(
    outputs=outputs,
    target_sizes=target_sizes,
    threshold=0.2
)

print(results)