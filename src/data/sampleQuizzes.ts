export const sampleQuizzes = {
  "cs301": {
    id: "cs-loops-quiz",
    title: "Loops and Iteration Quiz",
    class: "AP Computer Science A",
    timeLimit: 30,
    questions: [
      {
        id: 1,
        question: "What will be the output of the following Java code?\n\n```java\nfor (int i = 0; i < 5; i++) {\n    if (i % 2 == 0) {\n        System.out.print(i + \" \");\n    }\n}\n```",
        options: [
          "0 2 4",
          "0 1 2 3 4",
          "1 3 5",
          "0 2 4 6"
        ],
        correct: 0,
        explanation: "The loop runs from 0 to 4, and only prints even numbers (i % 2 == 0), so it prints 0, 2, and 4."
      },
      {
        id: 2,
        question: "Which loop structure is best when you know exactly how many times you want to iterate?",
        options: [
          "while loop",
          "do-while loop", 
          "for loop",
          "enhanced for loop"
        ],
        correct: 2,
        explanation: "A for loop is typically used when you know the exact number of iterations needed."
      },
      {
        id: 3,
        question: "What is the main difference between a while loop and a do-while loop?",
        options: [
          "while loops are faster",
          "do-while loops execute at least once",
          "while loops can't use break statements",
          "do-while loops don't use conditions"
        ],
        correct: 1,
        explanation: "A do-while loop executes its body at least once before checking the condition, while a while loop checks the condition first."
      },
      {
        id: 4,
        question: "What will cause an infinite loop in the following code?\n\n```java\nint x = 10;\nwhile (x > 0) {\n    System.out.println(x);\n    // Missing statement\n}\n```",
        options: [
          "x++;",
          "x--;",
          "Nothing - it will terminate",
          "Not decrementing x"
        ],
        correct: 3,
        explanation: "Without decrementing x, the condition x > 0 will always be true, creating an infinite loop."
      },
      {
        id: 5,
        question: "Which statement is used to skip the current iteration and continue with the next one?",
        options: [
          "break",
          "continue",
          "return",
          "exit"
        ],
        correct: 1,
        explanation: "The 'continue' statement skips the rest of the current iteration and moves to the next iteration."
      }
    ]
  },
  "math205": {
    id: "calc-integration-quiz",
    title: "Integration Techniques Quiz",
    class: "AP Calculus BC",
    timeLimit: 45,
    questions: [
      {
        id: 1,
        question: "What is the integral of ∫ 3x² dx?",
        options: [
          "x³ + C",
          "3x³ + C", 
          "x³/3 + C",
          "6x + C"
        ],
        correct: 0,
        explanation: "Using the power rule: ∫ 3x² dx = 3 · x³/3 + C = x³ + C"
      },
      {
        id: 2,
        question: "Which integration technique is best for ∫ x·e^x dx?",
        options: [
          "Substitution",
          "Integration by parts",
          "Partial fractions",
          "Direct integration"
        ],
        correct: 1,
        explanation: "Integration by parts is used when you have a product of functions, like x·e^x."
      },
      {
        id: 3,
        question: "What is ∫ sin(x) dx?",
        options: [
          "cos(x) + C",
          "-cos(x) + C",
          "sin(x) + C",
          "-sin(x) + C"
        ],
        correct: 1,
        explanation: "The integral of sin(x) is -cos(x) + C."
      },
      {
        id: 4,
        question: "If f'(x) = 2x + 3 and f(0) = 5, what is f(x)?",
        options: [
          "x² + 3x + 5",
          "2x² + 3x + 5",
          "x² + 3x + 2",
          "x² + 3x"
        ],
        correct: 0,
        explanation: "∫(2x + 3)dx = x² + 3x + C. Using f(0) = 5: 0 + 0 + C = 5, so C = 5. Therefore f(x) = x² + 3x + 5."
      },
      {
        id: 5,
        question: "What is the result of ∫₀² x dx?",
        options: [
          "2",
          "4",
          "1",
          "8"
        ],
        correct: 0,
        explanation: "∫₀² x dx = [x²/2]₀² = 4/2 - 0/2 = 2"
      }
    ]
  },
  "eng102": {
    id: "poetry-analysis-quiz",
    title: "Poetry Analysis Quiz",
    class: "AP English Literature", 
    timeLimit: 40,
    questions: [
      {
        id: 1,
        question: "What literary device is being used in the line: 'The wind whispered through the trees'?",
        options: [
          "Metaphor",
          "Personification",
          "Simile",
          "Alliteration"
        ],
        correct: 1,
        explanation: "Personification gives human qualities (whispering) to non-human things (wind)."
      },
      {
        id: 2,
        question: "In poetry, what is a volta?",
        options: [
          "A rhyme scheme",
          "A type of meter",
          "A turn or shift in thought",
          "A poetic form"
        ],
        correct: 2,
        explanation: "A volta is a turn or shift in thought, often occurring in sonnets around line 9."
      },
      {
        id: 3,
        question: "Which of the following is an example of internal rhyme?",
        options: [
          "Roses are red, violets are blue",
          "Once upon a midnight dreary, while I pondered, weak and weary",
          "Twinkle, twinkle, little star",
          "Mary, Mary, quite contrary"
        ],
        correct: 1,
        explanation: "Internal rhyme occurs within a single line, like 'dreary' and 'weary' in the same line."
      },
      {
        id: 4,
        question: "What is the rhyme scheme of a Shakespearean sonnet?",
        options: [
          "ABAB CDCD EFEF GG",
          "ABBA ABBA CDECDE",
          "ABAB BCBC CDCD EE",
          "AABB CCDD EEFF GG"
        ],
        correct: 0,
        explanation: "A Shakespearean sonnet follows the rhyme scheme ABAB CDCD EFEF GG."
      },
      {
        id: 5,
        question: "What does 'iambic pentameter' mean?",
        options: [
          "Five stressed syllables per line",
          "Ten syllables with alternating unstressed/stressed pattern",
          "Five lines per stanza",
          "A rhyming couplet"
        ],
        correct: 1,
        explanation: "Iambic pentameter consists of five iambs (unstressed-stressed syllable pairs) per line, totaling ten syllables."
      }
    ]
  }
};