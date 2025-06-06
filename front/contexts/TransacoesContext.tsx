import React, { createContext, useContext, useState, ReactNode } from 'react';

type Transacao = {
    id: string;
    descricao: string;
    valor: number;
    data: string;
    tipo: 'receita' | 'despesa';
    pago: boolean; // adiciona o campo pago
};

type TransacoesContextType = {
    transacoes: Transacao[];
    adicionarTransacao: (transacao: Omit<Transacao, 'id'>) => void;
    alternarPago: (id: string) => void;  // nova função para alternar o pago
};

const TransacoesContext = createContext<TransacoesContextType | undefined>(undefined);

export function useTransacoes() {
    const ctx = useContext(TransacoesContext);
    if (!ctx) throw new Error('useTransacoes deve ser usado dentro do TransacoesProvider');
    return ctx;
}

export function TransacoesProvider({ children }: { children: ReactNode }) {
    const [transacoes, setTransacoes] = useState<Transacao[]>([
        // Dados de exemplo, com campo pago (false por padrão)
        { id: '1', descricao: 'Salário', valor: 3500, data: '2025-05-01', tipo: 'receita', pago: true },
        { id: '2', descricao: 'Freelance', valor: 1200, data: '2025-05-10', tipo: 'receita', pago: false },
        { id: '3', descricao: 'Supermercado', valor: 400, data: '2025-05-05', tipo: 'despesa', pago: true },
        { id: '4', descricao: 'Aluguel', valor: 1200, data: '2025-05-02', tipo: 'despesa', pago: false },
    ]);

    function adicionarTransacao(transacao: Omit<Transacao, 'id'>) {
        setTransacoes([
            ...transacoes,
            { ...transacao, id: String(Date.now()) }
        ]);
    }

    function alternarPago(id: string) {
        setTransacoes(transacoes =>
            transacoes.map(t =>
                t.id === id ? { ...t, pago: !t.pago } : t
            )
        );
    }

    return (
        <TransacoesContext.Provider value={{ transacoes, adicionarTransacao, alternarPago }}>
            {children}
        </TransacoesContext.Provider>
    );
}
