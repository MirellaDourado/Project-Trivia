import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor, act } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import questionsResponse from './mock/mockQuestions';
import questionsToken from './mock/mockToken';
// import { click } from '@testing-library/user-event/dist/click';

const name = 'Tryber';
const email = 'tryber@teste.com';

const other = 'Other';
const otherEmail = 'other@teste.com'

afterEach(() => jest.clearAllMocks());

describe('Testa a página de Ranking', () => {
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
    const firstRightAns = screen.getByText('False')
    userEvent.click(firstRightAns);
    const nextBtn1 = screen.getByText('Next');
    userEvent.click(nextBtn1);

    const rightAns2 = screen.getByText('Graviton')
    userEvent.click(rightAns2);
    const nextBtn2 = screen.getByText('Next');
    userEvent.click(nextBtn2);
    
    const rightAns3 = screen.getByText('Video Card');
    userEvent.click(rightAns3);
    const nextBtn3 = screen.getByText('Next');
    userEvent.click(nextBtn3);
    
    const rightAns4 = screen.getByText('Scar-20/G3SG1');
    userEvent.click(rightAns4);
    const nextBtn4 = screen.getByText('Next');
    userEvent.click(nextBtn4);

    const rightAns5 = screen.getByText('Junji Ito');
    userEvent.click(rightAns5);
    const nextBtn5 = screen.getByText('Next');
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

    const rankingBtn = screen.getByTestId('btn-ranking');
    expect(rankingBtn).toBeInTheDocument();
    userEvent.click(rankingBtn);

    const rankingTitle = screen.getByTestId('ranking-title')
    expect(rankingTitle).toBeInTheDocument(); 

    const rankingFirstPlayer = screen.getByTestId('player-name-0')
    expect(rankingFirstPlayer).toBeInTheDocument(); 

    const rankingFirstPlayerScore = screen.getByTestId('player-score-0')
    expect(rankingFirstPlayerScore).toBeInTheDocument(); 

    const homeBtn = screen.getByTestId('btn-go-home')
    expect(homeBtn).toBeInTheDocument(); 
    userEvent.click(homeBtn);
  })

  test('Testa se existem dois jogadores na ordem certa', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValueOnce(questionsToken).mockResolvedValue(questionsResponse),
    });
    renderWithRouterAndRedux(<App />)
    
    // Player Tryber
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const playBtn = screen.getByTestId('btn-play');
    
    userEvent.type(nameInput, name);
    userEvent.type(emailInput, email);
    userEvent.click(playBtn);

    await waitFor(() => {
      expect(screen.queryByText('Geography')).toBeInTheDocument()
    })
    userEvent.click(screen.getByText('False'));
    userEvent.click(screen.getByText('Next'));

    userEvent.click(screen.getByText('Graviton'));
    userEvent.click(screen.getByText('Next'));

    userEvent.click(screen.getByText('Video Card'));
    userEvent.click(screen.getByText('Next'));
    
    userEvent.click(screen.getByText('Scar-20/G3SG1'));
    userEvent.click(screen.getByText('Next'));

    userEvent.click(screen.getByText('Junji Ito'));
    const nextBtn1 = screen.getByText('Next');
    userEvent.click(nextBtn1);

    await waitFor(() => {
      expect(nextBtn1).not.toBeInTheDocument()
    })

    userEvent.click(screen.getByTestId('btn-ranking'));
    userEvent.click(screen.getByTestId('btn-go-home'));

    // Player Player
    
    userEvent.type(screen.getByTestId('input-player-name'), 'player');
    userEvent.type(screen.getByTestId('input-gravatar-email'), 'player@test.com');
    userEvent.click(screen.getByTestId('btn-play'));

    await waitFor(() => {
      expect(screen.queryByText('Geography')).toBeInTheDocument()
    })
    userEvent.click(screen.getByText('False'));
    userEvent.click(screen.getByText('Next'));

    userEvent.click(screen.getByText('Graviton'));
    userEvent.click(screen.getByText('Next'));

    userEvent.click(screen.getByText('Video Card'));
    userEvent.click(screen.getByText('Next'));
    
    userEvent.click(screen.getByText('Scar-20/G3SG1'));
    userEvent.click(screen.getByText('Next'));

    userEvent.click(screen.getByText('Junji Ito'));
    const nextBtn2 = screen.getByText('Next');
    userEvent.click(nextBtn2);

    await waitFor(() => {
      expect(nextBtn2).not.toBeInTheDocument()
    })

    userEvent.click(screen.getByTestId('btn-ranking'));
    userEvent.click(screen.getByTestId('btn-go-home'));

     // Player Loser
    
     userEvent.type(screen.getByTestId('input-player-name'), 'loser');
     userEvent.type(screen.getByTestId('input-gravatar-email'), 'loser@test.com');
     userEvent.click(screen.getByTestId('btn-play'));
 
     await waitFor(() => {
       expect(screen.queryByText('Geography')).toBeInTheDocument()
     })
     userEvent.click(screen.getByText('True'));
     userEvent.click(screen.getByText('Next'));
 
     userEvent.click(screen.getByText('Z boson'));
     userEvent.click(screen.getByText('Next'));
 
     userEvent.click(screen.getByText('Processor'));
     userEvent.click(screen.getByText('Next'));
     
     userEvent.click(screen.getByText('AWP'));
     userEvent.click(screen.getByText('Next'));
 
     userEvent.click(screen.getByText('Akira Toriyama'));
     const nextBtn3 = screen.getByText('Next');
     userEvent.click(nextBtn3);
 
     await waitFor(() => {
       expect(nextBtn3).not.toBeInTheDocument()
     })
 
     userEvent.click(screen.getByTestId('btn-ranking'));
     userEvent.click(screen.getByTestId('btn-go-home'));

     // Player OtherPlayer
    
     userEvent.type(screen.getByTestId('input-player-name'), 'OtherPlayer');
     userEvent.type(screen.getByTestId('input-gravatar-email'), 'OtherPlayer@test.com');
     userEvent.click(screen.getByTestId('btn-play'));
 
     await waitFor(() => {
       expect(screen.queryByText('Geography')).toBeInTheDocument()
     })
     userEvent.click(screen.getByText('False'));
     userEvent.click(screen.getByText('Next'));
 
     userEvent.click(screen.getByText('Z boson'));
     userEvent.click(screen.getByText('Next'));
 
     userEvent.click(screen.getByText('Processor'));
     userEvent.click(screen.getByText('Next'));
     
     userEvent.click(screen.getByText('AWP'));
     userEvent.click(screen.getByText('Next'));
 
     userEvent.click(screen.getByText('Akira Toriyama'));
     const nextBtn4 = screen.getByText('Next');
     userEvent.click(nextBtn4);
 
     await waitFor(() => {
       expect(nextBtn4).not.toBeInTheDocument()
     })
 
     userEvent.click(screen.getByTestId('btn-ranking'));
     userEvent.click(screen.getByTestId('btn-go-home'));


     // Player Person
    
     userEvent.type(screen.getByTestId('input-player-name'), 'Person');
     userEvent.type(screen.getByTestId('input-gravatar-email'), 'Person@test.com');
     userEvent.click(screen.getByTestId('btn-play'));
 
     await waitFor(() => {
       expect(screen.queryByText('Geography')).toBeInTheDocument()
     })
     userEvent.click(screen.getByText('False'));
     userEvent.click(screen.getByText('Next'));
 
     userEvent.click(screen.getByText('Graviton'));
     userEvent.click(screen.getByText('Next'));
 
     userEvent.click(screen.getByText('Video Card'));
     userEvent.click(screen.getByText('Next'));
     
     userEvent.click(screen.getByText('Scar-20/G3SG1'));
     userEvent.click(screen.getByText('Next'));
 
     userEvent.click(screen.getByText('Akira Toriyama'));
     const nextBtn5 = screen.getByText('Next');
     userEvent.click(nextBtn5);
 
     await waitFor(() => {
       expect(nextBtn5).not.toBeInTheDocument()
     })
 
     userEvent.click(screen.getByTestId('btn-ranking'));
     userEvent.click(screen.getByTestId('btn-go-home'));


    // Player Other

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValueOnce(questionsToken).mockResolvedValue(questionsResponse),
    });

    const nameInput2 = screen.getByTestId('input-player-name');
    const emailInput2 = screen.getByTestId('input-gravatar-email');
    const playBtn2 = screen.getByTestId('btn-play');

    userEvent.type(nameInput2, other);
    userEvent.type(emailInput2, otherEmail);
    userEvent.click(playBtn2);

    await waitFor(() => {
      expect(screen.queryByText('Geography')).toBeInTheDocument()
    })
    userEvent.click(screen.getByText('True'));
    userEvent.click(screen.getByText('Next'));

    userEvent.click(screen.getByText('Graviton'));
    userEvent.click(screen.getByText('Next'));
    
    userEvent.click(screen.getByText('Processor'));
    userEvent.click(screen.getByText('Next'));
    
    userEvent.click(screen.getByText('AWP'));
    userEvent.click(screen.getByText('Next'));

    userEvent.click(screen.getByText('Junji Ito'));
    const nextBtn6 = screen.getByText('Next');
    userEvent.click(nextBtn6);

    await waitFor(() => {
      expect(nextBtn6).not.toBeInTheDocument()
    })

    userEvent.click(screen.getByTestId('btn-ranking'));

    const FirstPlayer = screen.getByTestId('player-name-0')
    expect(FirstPlayer).toHaveTextContent('Tryber'); 

    const SecondPlayer = screen.getByTestId('player-name-1')
    expect(SecondPlayer).toHaveTextContent('Other'); 
  })

  test('Se se ao clicar no botão "Home", volta para página de login', async () => {
    const { history } = renderWithRouterAndRedux(<App/>)

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValueOnce(questionsToken).mockResolvedValue(questionsResponse),
    });
    
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const playBtn = screen.getByTestId('btn-play');
    
    userEvent.type(nameInput, name);
    userEvent.type(emailInput, email);
    userEvent.click(playBtn);

    await waitFor(() => {
      expect(screen.queryByText('Geography')).toBeInTheDocument()
    });
    const firstRightAns = screen.getByText('False')
    userEvent.click(firstRightAns);
    const nextBtn1 = screen.getByText('Next');
    userEvent.click(nextBtn1);

    const rightAns2 = screen.getByText('Graviton')
    userEvent.click(rightAns2);
    const nextBtn2 = screen.getByText('Next');
    userEvent.click(nextBtn2);
    
    const rightAns3 = screen.getByText('Video Card');
    userEvent.click(rightAns3);
    const nextBtn3 = screen.getByText('Next');
    userEvent.click(nextBtn3);
    
    const rightAns4 = screen.getByText('Scar-20/G3SG1');
    userEvent.click(rightAns4);
    const nextBtn4 = screen.getByText('Next');
    userEvent.click(nextBtn4);

    const rightAns5 = screen.getByText('Junji Ito');
    userEvent.click(rightAns5);
    const nextBtn5 = screen.getByText('Next');
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

    const rankingBtn = screen.getByTestId('btn-ranking');
    expect(rankingBtn).toBeInTheDocument();
    userEvent.click(rankingBtn);

    const homeBtn = screen.getByTestId('btn-go-home')
    expect(homeBtn).toBeInTheDocument(); 
    userEvent.click(homeBtn);

    expect(history.location.pathname).toBe('/');
  })
})