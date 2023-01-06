import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux'
import invalidToken from './mock/mockInvalidToken';

// const renderWithRouter = (component) => {
//     const history = createMemoryHistory();
//     return ({
//         ...render(<Router history={history}>{component}</Router>), history,
//     });
// };
afterEach(() => jest.clearAllMocks());

describe('Testa a página de login', () => {
    it('Testa se os inputs de nome e email estão presentes na tela', () => {
        renderWithRouterAndRedux(<App />);
        const nameInput = screen.getByTestId('input-player-name');
        const emailInput = screen.getByTestId('input-gravatar-email');
        const playBtn = screen.getByTestId('btn-play');
        expect(nameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(playBtn).toBeInTheDocument();
    });

    it('Testa se a função enable/disable do botão Play está funcionando', () => {
        renderWithRouterAndRedux(<App />);
        const nameInput = screen.getByTestId('input-player-name');
        const emailInput = screen.getByTestId('input-gravatar-email');
        const playBtn = screen.getByTestId('btn-play');
        expect(playBtn).toBeDisabled();
        userEvent.type(nameInput, 'Tryber');
        userEvent.type(emailInput, 'tryber@trybe.com');
        expect(playBtn).toBeEnabled();
    });

    it('Testa o botão que leva a página de configurações', () => {
        renderWithRouterAndRedux(<App />);
        const configBtn = screen.getByTestId('btn-settings');
        expect(configBtn).toBeInTheDocument();
        userEvent.click(configBtn);
        const settingsTitle = screen.getByTestId('settings-title');
        expect(settingsTitle).toBeInTheDocument();
    });

    it('Testa a função getTriviaToken', async () => {
        jest.spyOn(global, 'fetch');
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(invalidToken),
        });
        renderWithRouterAndRedux(<App />);
        userEvent.type(screen.getByTestId('input-player-name'), 'Tryber');
        userEvent.type(screen.getByTestId('input-gravatar-email'), 'tryber@trybe.com');
        userEvent.click(screen.getByTestId('btn-play'));
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });
});