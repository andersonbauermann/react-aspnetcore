import React from 'react'
import TitlePage from './../../components/TitlePage';
import { useParams } from 'react-router-dom';

export default function ClientForm() {
  let { id } = useParams();

  return (
    <>
        <TitlePage title='Formulário' />
        <div>
            
        </div>
    </>
  )
}
