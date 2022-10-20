# Reinforced TicTacToe

This project has been created as a demonstration and is completely
open source.

The opponent AI is based on a reinforcement learning algorithm
(On-policy first-visit Monte Carlo) that has been trained on 1 million
matches against a random opponent.

The algorithm had no model of TicTacToe and discovered the best
winning strategy play-by-play by discounting a given reward (-1 for a loss / 0 for a draw / 1 for a win) over all previous in-game actions after each episode.

## Training

The caulculation of the Q-ActionValues has been done in Python and can be seen in the 