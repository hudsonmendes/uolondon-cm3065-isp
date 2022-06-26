import pathlib

import deepspeech as ds
import librosa as lr
import numpy as np


class Transcriber:
    model: ds.Model

    def __init__(
        self, locale: str, model_name: str = "/Users/hudsonmendes/Models/pretrained/deepspeech/deepspeech-0.9.3-models"
    ):
        self.locale = locale
        self.model = ds.Model(f"{model_name}.pbmm")
        self.model.enableExternalScorer(f"{model_name}.scorer")
        self.desired_sample_rate = self.model.sampleRate()

    def transcribe(self, filepath: pathlib.Path):
        audiofile = lr.load(filepath, sr=self.desired_sample_rate)[0]
        audiofile = (audiofile * 32767).astype(np.int16)
        return self.model.stt(audiofile)
