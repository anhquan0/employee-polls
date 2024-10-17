let users = {
  hiennt260: {
    id: 'hiennt260',
    name: 'Hien Nguyen Thuy',
    password:'1234567',
    avatarURL: 'https://picsum.photos/200',
    answers: {
      'qy1easen45rghipe9mvfz9qql4': 'optionOne'
    },
    questions: ['qy1easen45rghipe9mvfz9qql4', 'am8ehyc8byjqgar0jgpub9']
  },
  quanlna1: {
    id: 'quanlna1',
    name: 'Quan Le Ngoc Anh',
    password:'1234567',
    avatarURL: 'https://picsum.photos/200',
    answers: {
      vthrdm985a262al8qx3do: 'optionOne',
      xj352vofupe1dqz9emx13r: 'optionTwo'
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do']
  },
  johndoe: {
    id: 'johndoe',
    name: 'John Doe',
    password:'123123',
    avatarURL: 'https://picsum.photos/200',
    answers: {
      xj352vofupe1dqz9emx13r: 'optionOne',
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r']
  },
  zoshikanlu: {
    id: 'zoshikanlu',
    password:'pass246',
    name: 'Zenobia Oshikanlu',
    avatarURL: 'https://picsum.photos/200',
    answers: {
      "xthrdm985a262al8qx3do": 'optionOne',
    },
    questions: ['aj352vofupe1dqz9emx13r','xthrdm985a262al8qx3do','6ni6ok3ym7mf1p33lnez'],
  }
};

let questions = {
  'qy1easen45rghipe9mvfz9qql4': {
    id: 'qy1easen45rghipe9mvfz9qql4',
    author: 'hiennt260',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['hiennt260'],
      text: 'have dinner at 7:00PM'
    },
    optionTwo: {
      votes: [],
      text: 'have dinner at 8:00PM'
    }
  },
  '6ni6ok3ym7mf1p33lnez': {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'johndoe',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'become a superhero'
    },
    optionTwo: {
      votes: ['johndoe', 'hiennt260'],
      text: 'become a supervillian'
    }
  },
  'am8ehyc8byjqgar0jgpub9': {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'hiennt260',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'be telekinetic'
    },
    optionTwo: {
      votes: ['hiennt260'],
      text: 'be telepathic'
    }
  },
  xj352vofupe1dqz9emx13r: {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'johndoe',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['johndoe'],
      text: 'write JavaScript'
    },
    optionTwo: {
      votes: ['quanlna1'],
      text: 'write Java'
    }
  },
  xthrdm985a262al8qx3do: {
    id: 'xthrdm985a262al8qx3do',
    author: 'zoshikanlu',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['hiennt260'],
      text: 'take a course on ReactJS',
    },
    optionTwo: {
      votes: ['johndoe'],
      text: 'take a course on AWS Foudation'
    }
  },
  aj352vofupe1dqz9emx13r: {
    id: 'aj352vofupe1dqz9emx13r',
    author: 'zoshikanlu',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['quanlna1', 'zoshikanlu'],
      text: 'deploy to QA environment every weeks',
    },
    optionTwo: {
      votes: ['hiennt260'],
      text: 'deploy to QA environment once every two weeks'
    }
  }
};

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getUsers () {
  return new Promise((resolve) => {
    setTimeout(() => resolve({...users}), 1000)
  })
}

export function _getQuestions () {
  return new Promise((resolve) => {
    setTimeout(() => resolve({...questions}), 1000)
  })
}

function formatQuestion ({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author: author.id,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    }
  }
}

export function _saveQuestion (question) {
  return new Promise((resolve, reject) => {
    if (!question.optionOneText || !question.optionTwoText || !question.author) {
      reject("Please provide optionOneText, optionTwoText, and author");
    }

    const formattedQuestion = formatQuestion(question)
    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      }

      resolve(formattedQuestion)
    }, 1000)
  })
}

export function _saveQuestionAnswer ({ authedUser, qid, answer }) {
  return new Promise((resolve, reject) => {
    if (!authedUser || !qid || !answer) {
      return reject("Error! Please provide all information");
    }

    if (!users[authedUser]) {
      return reject("Error! User doesn't exist");
    }

    if (!questions[qid]) {
      return reject("Error! Question doesn't exist");
    }

    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [qid]: answer
          }
        }
      }

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authedUser])
          }
        }
      }

      resolve(true)
    }, 400)
  })
}
