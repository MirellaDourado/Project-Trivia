import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import questionsResponse from './mock/mockQuestions';
import questionsToken from './mock/mockToken';

const name = 'Tryber';
const email = 'tryber@teste.com';

afterEach(() => jest.clearAllMocks());

describe('Testa a página de FeedBack', () => {
  test('Testa se existem os componentes', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValueOnce(questionsToken).mockResolvedValue(questionsResponse),
    });
    renderWithRouterAndRedux(<App />)
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const playBtn = screen.getByTestId('btn-play');

    userEvent.type(nameInput, name);
    userEvent.type(emailInput, email);
    userEvent.click(playBtn);

    await waitFor(() => {
      expect(screen.queryByText('Geography')).toBeInTheDocument()
    })
    const rightAnswer = screen.getByTestId('correct-answer')
    expect(rightAnswer).toBeInTheDocument();
    const firstRightAns = screen.getByText('False')
    userEvent.click(firstRightAns);
    const nextBtn1 = screen.getByText('Next');
    userEvent.click(nextBtn1);

    const rightAns2 = screen.getByText('Graviton')
    expect(rightAns2).toBeInTheDocument();
    userEvent.click(rightAns2);
    const nextBtn2 = screen.getByText('Next');
    expect(nextBtn2).toBeInTheDocument();
    userEvent.click(nextBtn2);
    
    const rightAns3 = screen.getByText('Video Card');
    expect(rightAns3).toBeInTheDocument();
    userEvent.click(rightAns3);
    const nextBtn3 = screen.getByText('Next');
    expect(nextBtn3).toBeInTheDocument();
    userEvent.click(nextBtn3);
    
    const rightAns4 = screen.getByText('Scar-20/G3SG1');
    expect(rightAns4).toBeInTheDocument();
    userEvent.click(rightAns4);
    const nextBtn4 = screen.getByText('Next');
    expect(nextBtn4).toBeInTheDocument();
    userEvent.click(nextBtn4);

    const rightAns5 = screen.getByText('Junji Ito');
    expect(rightAns5).toBeInTheDocument();
    userEvent.click(rightAns5);
    const nextBtn5 = screen.getByText('Next');
    expect(nextBtn5).toBeInTheDocument();
    userEvent.click(nextBtn5);

    await waitFor(() => {
      expect(nextBtn5).not.toBeInTheDocument()
    })

    const feedbackMessage = screen.getByTestId('feedback-text');
    expect(feedbackMessage).toBeInTheDocument();

    const totalQuestions = screen.getByTestId('feedback-total-question');
    expect(totalQuestions).toBeInTheDocument();

    const totalScore = screen.getByTestId('feedback-total-score');
    expect(totalScore).toBeInTheDocument();
  })

  test('Testa se aparece o texto "Well Done!"', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValueOnce(questionsToken).mockResolvedValue(questionsResponse),
    });
    renderWithRouterAndRedux(<App />)
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const playBtn = screen.getByTestId('btn-play');

    userEvent.type(nameInput, name);
    userEvent.type(emailInput, email);
    userEvent.click(playBtn);

    await waitFor(() => {
      expect(screen.queryByText('Geography')).toBeInTheDocument()
    })
    const rightAnswer = screen.getByTestId('correct-answer')
    expect(rightAnswer).toBeInTheDocument();
    const firstRightAns = screen.getByText('False')
    userEvent.click(firstRightAns);
    const nextBtn1 = screen.getByText('Next');
    userEvent.click(nextBtn1);

    const rightAns2 = screen.getByText('Graviton')
    expect(rightAns2).toBeInTheDocument();
    userEvent.click(rightAns2);
    const nextBtn2 = screen.getByText('Next');
    expect(nextBtn2).toBeInTheDocument();
    userEvent.click(nextBtn2);
    
    const rightAns3 = screen.getByText('Video Card');
    expect(rightAns3).toBeInTheDocument();
    userEvent.click(rightAns3);
    const nextBtn3 = screen.getByText('Next');
    expect(nextBtn3).toBeInTheDocument();
    userEvent.click(nextBtn3);
    
    const rightAns4 = screen.getByText('Scar-20/G3SG1');
    expect(rightAns4).toBeInTheDocument();
    userEvent.click(rightAns4);
    const nextBtn4 = screen.getByText('Next');
    expect(nextBtn4).toBeInTheDocument();
    userEvent.click(nextBtn4);

    const rightAns5 = screen.getByText('Junji Ito');
    expect(rightAns5).toBeInTheDocument();
    userEvent.click(rightAns5);
    const nextBtn5 = screen.getByText('Next');
    expect(nextBtn5).toBeInTheDocument();
    userEvent.click(nextBtn5);

    await waitFor(() => {
      expect(nextBtn5).not.toBeInTheDocument()
    })

    const feedbackMessage = screen.getByTestId('feedback-text');
    expect(feedbackMessage).toBeInTheDocument();
    expect(feedbackMessage).toHaveTextContent('Well Done!');
  })

  test('Testa se aparece o texto "Could be better..."', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValueOnce(questionsToken).mockResolvedValue(questionsResponse),
    });
    renderWithRouterAndRedux(<App />)
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const playBtn = screen.getByTestId('btn-play');

    userEvent.type(nameInput, name);
    userEvent.type(emailInput, email);
    userEvent.click(playBtn);

    await waitFor(() => {
      expect(screen.queryByText('Geography')).toBeInTheDocument()
    })
    const rightAnswer = screen.getByTestId('correct-answer')
    expect(rightAnswer).toBeInTheDocument();
    const firstRightAns = screen.getByText('False')
    userEvent.click(firstRightAns);
    const nextBtn1 = screen.getByText('Next');
    userEvent.click(nextBtn1);

    const rightAns2 = screen.getByText('Z boson')
    expect(rightAns2).toBeInTheDocument();
    userEvent.click(rightAns2);
    const nextBtn2 = screen.getByText('Next');
    expect(nextBtn2).toBeInTheDocument();
    userEvent.click(nextBtn2);
    
    const rightAns3 = screen.getByText('Hard Drive');
    expect(rightAns3).toBeInTheDocument();
    userEvent.click(rightAns3);
    const nextBtn3 = screen.getByText('Next');
    expect(nextBtn3).toBeInTheDocument();
    userEvent.click(nextBtn3);
    
    const rightAns4 = screen.getByText('M4A1');
    expect(rightAns4).toBeInTheDocument();
    userEvent.click(rightAns4);
    const nextBtn4 = screen.getByText('Next');
    expect(nextBtn4).toBeInTheDocument();
    userEvent.click(nextBtn4);

    const rightAns5 = screen.getByText('Noboru Takahashi');
    expect(rightAns5).toBeInTheDocument();
    userEvent.click(rightAns5);
    const nextBtn5 = screen.getByText('Next');
    expect(nextBtn5).toBeInTheDocument();
    userEvent.click(nextBtn5);

    await waitFor(() => {
      expect(nextBtn5).not.toBeInTheDocument()
    })

    const feedbackMessage = screen.getByTestId('feedback-text');
    expect(feedbackMessage).toBeInTheDocument();
    expect(feedbackMessage).toHaveTextContent('Could be better...');
  })
})