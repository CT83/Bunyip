#!/usr/bin/env python

import argparse
import functools
import operator
import os
import re

import connexion
from flask import send_from_directory, redirect
from flask_cors import CORS

# from backend.Project import Project # TODO !!
from backend import AVAILABLE_MODELS

__author__ = 'Hendrik Strobelt, Sebastian Gehrmann'

CONFIG_FILE_NAME = 'lmf.yml'
projects = {}

app = connexion.App(__name__, debug=False)


class Project:
    def __init__(self, LM, config):
        self.config = config
        self.lm = LM()


def get_all_projects():
    res = {}
    for k in projects.keys():
        res[k] = projects[k].config
    return res


def calculate_fake_percent(res, fake_thres=0.35):
    total_no_words = len(res['bpe_strings'])
    pred_topk = res['pred_topk']
    pred_topk = functools.reduce(operator.iconcat, pred_topk, [])
    return round(sum([True if val >= fake_thres else False for word, val in pred_topk]) / total_no_words * 100, 2)


def analyze(analyze_request):
    project = analyze_request.get('project')
    text = analyze_request.get('text')
    # text = re.sub(r'\b(?:(?:https?|ftp)://)?\w[\w-]*(?:\.[\w-]+)+\S*“”', ' ', text)
    text = re.sub(r'\W+', ' ', text)

    res = {}
    if project in projects:
        p = projects[project]  # type: Project
        res = p.lm.check_probabilities(text, topk=20)

    res['percent'] = calculate_fake_percent(res)
    print("Percent Fake:", res['percent'])
    return {
        "request": {'project': project, 'text': text, "result": res},
    }


#########################
#  some non-logic routes
#########################


@app.route('/')
def redir():
    return redirect('client/index.html')


@app.route('/client/<path:path>')
def send_static(path):
    """ serves all files from ./client/ to ``/client/<path:path>``

    :param path: path from api call
    """
    return send_from_directory('client/dist/', path)


@app.route('/data/<path:path>')
def send_data(path):
    """ serves all files from the data dir to ``/data/<path:path>``

    :param path: path from api call
    """
    print('Got the data route for', path)
    return send_from_directory(args.dir, path)


app.add_api('server.yaml')

parser = argparse.ArgumentParser()
parser.add_argument("--model", default='gpt-2-small')
parser.add_argument("--nodebug", default=True)
parser.add_argument("--address",
                    default="127.0.0.1")  # 0.0.0.0 for nonlocal use
parser.add_argument("--port", default="5001")
parser.add_argument("--nocache", default=False)
parser.add_argument("--dir", type=str, default=os.path.abspath('data'))

parser.add_argument("--no_cors", action='store_true')

if __name__ == '__main__':
    args = parser.parse_args()

    if not args.no_cors:
        CORS(app.app, headers='Content-Type')

    app.run(port=int(args.port), debug=not args.nodebug, host=args.address)
else:
    args, _ = parser.parse_known_args()
    # load_projects(args.dir)
    try:
        model = AVAILABLE_MODELS[args.model]
    except KeyError:
        print("Model {} not found. Make sure to register it.".format(
            args.model))
        print("Loading GPT-2 instead.")
        model = AVAILABLE_MODELS['gpt-2']
    projects[args.model] = Project(model, args.model)
