import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import EnviaLance from '../../../../src/telas/Leilao/componentes/EnviaLance'
import { ENVIADO, NAO_ENVIADO } from '../../../../src/negocio/constantes/estadosLance'

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

describe('telas/Leilao/componentes/EnviaLance', () => {
  it('deve enviar o lance quando o batão for pressionado', async () => {
    const enviaLance = jest.fn(() => new Promise(resolve => resolve(ENVIADO)))

    const { getByPlaceHolderText, getA11yHint, getByText } = render(
      <EnviaLance enviaLance={enviaLance} cor="blue" />
    )

    const input = getByPlaceHolderText('R$')
    const botao = getA11yHint('Enviar lance')

    fireEvent.changeText(input, '10')
    fireEvent.press(botao)

    expect(enviaLance).toHaveBeenCalledWith('10')
    await waitFor(() => {
      expect(getByText(ENVIADO)).toBeTruthy()
    })

expect(()=> getByText(NAO_ENVIADO)).toThrow()

  })
})
