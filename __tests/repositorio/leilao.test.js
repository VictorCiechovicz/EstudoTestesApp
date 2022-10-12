import { obtemLeiloes } from '../../src/repositorio/leilao'
import apiLeiloes from '../../src/servicos/apiLeiloes'

//este mock faz com que não verifique se a api esta online ou não, caso ela estaja quando rodamos o teste.
jest.mock('../../src/servicos/apiLeiloes')

//abaixo temos um objeto representado a lista de leilões,
const mockLeiloes = [
  {
    id: 1,
    nome: 'Leilão',
    descricao: 'Descriçao do leilao'
  }
]

//este mock abaixo faz uma requisição no noso objeto criado acima
const mockRequisicao = (retorno)=>{
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve({
        data:retorno
      })
    },200)
  })

}

//este mock abaixo faz uma requisição com algum erro 
const mockRequisicaoErro = (retorno)=>{
  return new Promise((_, reject)=>{
    setTimeout(()=>{
     reject()
    },200)
  })

}



describe('repositorio/leilao', () => {

  //função responsavel por limpar a requisição a cada describe feito.
beforeEach(()=>{

  apiLeiloes.get.mockClear()
})


  describe('obtemLeiloes', () => {

    it('deve retornar uma lista de leilões', async () => {

      apiLeiloes.get.mockImplementation(()=> mockRequisicao(mockLeiloes))
      const resultado = await obtemLeiloes()
      

      expect(resultado).toEqual(mockLeiloes)

      expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes')

      expect(apiLeiloes.get).toHaveBeenCalledTimes(1)

    })
  })


  it('deve retornar uma lista vazia quando a requisição de leilões falhar', async () => {

    apiLeiloes.get.mockImplementation(()=> mockRequisicaoErro())
    const resultado = await obtemLeiloes()
    

    expect(resultado).toEqual([])

    expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes')
      
    expect(apiLeiloes.get).toHaveBeenCalledTimes(1)
  })

})
