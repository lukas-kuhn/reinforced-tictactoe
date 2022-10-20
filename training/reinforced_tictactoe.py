import numpy as np
import copy
from ast import literal_eval as make_tuple
import json

class TicTacToe:
  def __init__(self, training, opponent_starting):
      self.board = [[0,0,0],
                    [0,0,0],
                    [0,0,0]]
      self.ended = False
      self.training = training
      self.opponent_starting = opponent_starting

  def start_episode(self):
      self._reset_episode()
      if self.opponent_starting and self.training:
          opponent_action = self._sample_random_move()
          self._play_move(opponent_action[0], opponent_action[1], player=1)
      return 0, False, self.board, self._available_moves()

  def play(self, action, player=1):
      if self.opponent_starting and self.training:
        player = -1
      
      self._play_move(action[0], action[1], player=player)
    
      self._check_done()

      if self.training:
        if not self.ended:
          opponent_action = self._sample_random_move()
          self._play_move(opponent_action[0], opponent_action[1], player=(player*-1))

             
      if self.opponent_starting:
        reward = self._check_done()*-1
                    #  Reward       Done,        Board,       Available Moves
      return reward, self.ended, self.board, self._available_moves()

  def _sample_random_move(self):
    avmoves = self._available_moves()
    rand = np.random.randint(0, len(avmoves))
    rand_action = avmoves[rand]
    return rand_action

  def _available_moves(self):
    moves = []
    for i, row in enumerate(self.board):
      for j, col in enumerate(row):
        if self.board[i][j] == 0:
          moves.append((i,j))
    return moves

  def pretty_board(self):
    for row in self.board:
      row_str = str(row[0]) + " | " + str(row[1]) + " | " + str(row[2])
      row_str = row_str.replace("-1", "O").replace("1", "X").replace("0", "-")
      print(row_str)


  def _play_move(self, row, column, player):
       self.board[row][column] = player
  
  def _check_done(self):
      possible = []

      for i in range(3):
          possible.append(self.board[i][0] + self.board[i][1] + self.board[i][2])

      for i in range(3):
          possible.append(self.board[0][i] + self.board[1][i] + self.board[2][i])

      possible.append(self.board[0][0] + self.board[1][1] + self.board[2][2])
      possible.append(self.board[0][2] + self.board[1][1] + self.board[2][0])


      if 3 in possible:
          self.ended = True
          return 1
      elif -3 in possible:
          self.ended = True
          return -1
      else:
          if len(self._available_moves()) == 0:
            self.ended = True
            return 0
          else:
            return 0

  def _reset_episode(self):
      self.board = [[0,0,0],
                    [0,0,0],
                    [0,0,0]]
      self.ended = False
    
  def board_to_string(self):
    return str(self.board)



#Create a game to train on
game = TicTacToe(training=True, opponent_starting=True)

#Parameters for training
epsilon = 0.1
gamma = 0.90

q_actionvalues = {}
returns = {}

#Run a million episodes
for episode in range(0,1000000):
    reward, done, board, avmoves = game.start_episode()

    states = []
    actions = []
    rewards = []

    while(not done):
        if str(board) in q_actionvalues:

          current_board = q_actionvalues[str(board)]

          if np.random.random() < 1-epsilon:
            max_value = max(current_board.values())  # maximum value
            max_keys = [k for k, v in current_board.items() if v == max_value]
            
            action = make_tuple(max_keys[0])
          else:
            action = game._sample_random_move()
        else:
          action = game._sample_random_move()

        #print()
        #game.pretty_board()

        states.append(copy.deepcopy(board))
        actions.append(action)
        rewards.append(reward)
        reward, done, board, avmoves = game.play(action)
      
    rewards.append(reward)
    #print(rewards)

    reward=0
    for i in range(len(states)-1, -1, -1):
      reward = (gamma * reward) + rewards[i+1] 


      if str(states[i]) in returns:
        if str(actions[i]) in returns[str(states[i])]:
          ret = returns[str(states[i])][str(actions[i])]
          value = ret[0]
          count = ret[1]

          val_refresh = ((value*count) + reward)/(count+1)
          returns[str(states[i])][str(actions[i])] = [val_refresh, count+1]
        else:
          returns[str(states[i])][str(actions[i])] = [reward, 1]
      else:
        returns[str(states[i])] = {}
        returns[str(states[i])][str(actions[i])] = [reward, 1]

      if str(states[i]) in q_actionvalues:
        q_actionvalues[str(states[i])][str(actions[i])] = returns[str(states[i])][str(actions[i])][0]
      else:
        q_actionvalues[str(states[i])] = {}
        q_actionvalues[str(states[i])][str(actions[i])] = returns[str(states[i])][str(actions[i])][0]

# Save qActionValues to file
with open("qvalues1milopponent.json", "w") as fp:
    json.dump(q_actionvalues,fp)

