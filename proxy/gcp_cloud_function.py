import json
import os

import Algorithmia

ACCESS_KEY = os.environ.get('ALGORITHMIA_KEY')


def forward(request):
    input_text = json.loads(request.get_data(as_text=True))['text']
    input = {"text": input_text}
    client = Algorithmia.client(ACCESS_KEY)
    algo = client.algo('ct83/bunyip_gpt_detector')
    algo.set_options(timeout=300)  # optional
    return algo.pipe(input).result, 200
