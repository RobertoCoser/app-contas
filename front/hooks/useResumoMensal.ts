import { useState, useEffect } from 'react';
import axios from 'axios';

type Resumo = {
  mes: number;
  tipo: 'receita' | 'despesa';
  total: string;
};

export function useResumoMensal() {
  const [dados, setDados] = useState<Resumo[]>([]);

  useEffect(() => {
    axios.get<Resumo[]>('http://localhost:3000/relatorio/resumo-mensal')
      .then(res => setDados(res.data))
      .catch(err => console.error(err));
  }, []);

  return dados;
}
