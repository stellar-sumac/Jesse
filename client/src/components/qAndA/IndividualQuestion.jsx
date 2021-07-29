/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import styled from 'styled-components';
import QuestionFooter from './QuestionFooter';
import IndividualAnswer from './IndividualAnswer';

const QuestionBodyAndQuestionFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const QuestionBody = styled.div`
  margin: 10px;
  color: #8a9ea0;
  font-weight: 700;
`;

const EntireAnswerSection = styled.div`
  display: block;
`;

const AnswerSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const A = styled.div`
  flex: 1;
  margin: 10px 0 0 10px;
  color: #8a9ea0;
  font-weight: 700;
`;

const AnswerBodyAndAnswerFooter = styled.div`
  flex: 49;
  color: #8a9ea0;
  font-weight: 400;
`;

const LoadMoreAnswersButton = styled.button`
  border: none;
  margin: 10px;
  color: #B5B2B0;
`;

const IndividualQuestion = ({ question }) => {
  const [answers, setAnswers] = React.useState([]);

  React.useEffect(() => {
    axios.get('/qa/questions/:question_id/answers', {
      params: {
        question_id: question.question_id,
      },
    })
      .then((res) => {
        const sellerAnswers = res.data.filter((answer) => (
          answer.answerer_name.toLowerCase() === 'seller'
        ));
        const customerAnswers = res.data.filter((answer) => (
          answer.answerer_name.toLowerCase() !== 'seller'
        ));
        customerAnswers.sort(customerAnswers.helpfulness);
        const sortedAnswers = sellerAnswers.concat(customerAnswers);
        setAnswers(sortedAnswers);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <QuestionBodyAndQuestionFooter>
        <QuestionBody key={question.question_id}>
          {`Q: ${question.question_body}`}
        </QuestionBody>
        <QuestionFooter question={question} />
      </QuestionBodyAndQuestionFooter>
      <EntireAnswerSection>
        <AnswerSection>
          {answers.length > 0 && <A>A:&nbsp;</A>}
          {answers.length > 0 &&
          <AnswerBodyAndAnswerFooter>
            {answers.map((answer, index) => (
              <IndividualAnswer key={index} answer={answer} />
            ))}
          </AnswerBodyAndAnswerFooter>}
        </AnswerSection>
        <LoadMoreAnswersButton>
          Load More Answers
        </LoadMoreAnswersButton>
      </EntireAnswerSection>
    </div>
  );
};

IndividualQuestion.defaultProps = {
  question: {},
};

IndividualQuestion.propTypes = {
  question: propTypes.shape({
    answers: propTypes.object,
    asker_name: propTypes.string,
    question_body: propTypes.string,
    question_date: propTypes.string,
    question_helpfulness: propTypes.number,
    quesiton_id: propTypes.number,
    reported: propTypes.bool,
  }),
};

export default IndividualQuestion;
