import React, { useState } from 'react'
import TitlePage from '../../components/TitlePage'
import { Form, InputGroup } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const clients = [
  {
    id: 1,
    name: "Microsoft",
    sponsor: "Teste 0",
    contact: 123123123,
    status: "Ativo"
  },
  {
    id: 2,
    name: "Amazon",
    sponsor: "Teste 1",
    contact: 456456456,
    status: "Em análise"
  },
  {
    id: 3,
    name: "SAP",
    sponsor: "Teste 2",
    contact: 345345,
    status: "Inativo"
  },
  {
    id: 4,
    name: "Google",
    sponsor: "Teste 3",
    contact: 678345678,
    status: "Ativo"
  },
  {
    id: 5,
    name: "Meta",
    sponsor: "Teste 4",
    contact: 56756567,
    status: "Ativo"
  }
]

export default function ClientList() {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredClients = clients.filter((client) => {
    return (
      Object.values(client)
            .join(' ')
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    )
  });

  const newClient = () => {
    history.push('/client/detail');
  }

  return (
    <>
      <TitlePage title='Lista de Clientes'>
        <button className='btn btn-sm outline-seconday' onClick={newClient}>
          <i className='fas fa-plus me-2' />
          Novo Cliente
        </button>
      </TitlePage>
      <InputGroup className='mt-3 mb-3'>
        <InputGroup.Text>
          Buscar: 
        </InputGroup.Text>
        <Form.Control
          onChange={handleInputChange}
          placeholder='Buscar por nome do cliente'
        />
      </InputGroup>
      <table className="table table-striped table-hover">
        <thead className='table-dark mt-3'>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Responsável</th>
            <th scope="col">Contato</th>
            <th scope="col">Situação</th>
            <th scope="col">Opções</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((client) => (
            <tr key={client.id}>
              <td>{ client.id }</td>
              <td>{ client.name }</td>
              <td>{ client.sponsor }</td>
              <td>{ client.contact }</td>
              <td>{ client.status }</td>
              <td>
                <div>
                  <button className='btn btn-sm btn-outline-primary me-2' onClick={() => history.push(`/client/detail/${client.id}`)}>
                    <i className='fas fa-user-edit me-2' />
                    Editar
                  </button>
                  <button className='btn btn-sm btn-outline-danger me-2'>
                    <i className='fas fa-user-times me-2' />
                    Desativar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
