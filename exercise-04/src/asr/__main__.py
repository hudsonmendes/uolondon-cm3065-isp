from argparse import ArgumentParser

import pathlib

def main():
    print("Hello, world!")

def get_args():
    parser = ArgumentParser()
    parser.add_argument("-l", "--locale", type=str, help="The language of the audio file to be ASR'd")
    parser.add_argument("-f", "--filepath", type=pathlib.Path, help="The language of the audio file to be ASR'd")
    return parser.parse_args()

if __name__ == "__main__":
    main()