import json

from model_hydration import hydrate


def parse_model(raw_payload):
    return hydrate(json.loads(raw_payload))
