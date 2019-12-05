#!/usr/bin/env python
import re

import flask
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

from backend.api import LM

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/api/analyze', methods=['POST', 'OPTIONS'])
@cross_origin()
def analyze():
    text = flask.request.get_json().get('text')
    # text = re.sub(r'\b(?:(?:https?|ftp)://)?\w[\w-]*(?:\.[\w-]+)+\S*“”', ' ', text)
    text = re.sub(r'\W+', ' ', text)
    res = {}
    res = LM().check_probabilities(text, topk=20)
    res['percent'] = 0
    print("Percent Fake:", res['percent'])
    return jsonify({
        "request": {'text': text, "result": res},
    })


if __name__ == '__main__':
    app.run(port=5001)
