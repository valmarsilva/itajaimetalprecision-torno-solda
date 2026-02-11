
export interface TestResult {
  id: string;
  category: 'Navegação' | 'Comunicação' | 'IA' | 'Sistema';
  testName: string;
  passed: boolean;
  message: string;
}

export const runAutomatedSuite = async (): Promise<TestResult[]> => {
  const results: TestResult[] = [];
  const whatsappNumber = "5547992460045";

  // 1. Teste de Âncoras de Navegação
  const navLinks = ['#home', '#servicos', '#orcamento', '#contato'];
  navLinks.forEach(href => {
    const exists = !!document.querySelector(href);
    results.push({
      id: `nav-${href}`,
      category: 'Navegação',
      testName: `Destino: ${href}`,
      passed: exists,
      message: exists ? 'ID encontrado no DOM.' : 'AVISO: Destino de navegação não encontrado.'
    });
  });

  // 2. Validação de Canal de Vendas (WhatsApp)
  const waLinks = Array.from(document.querySelectorAll('a[href*="wa.me"]')) as HTMLAnchorElement[];
  const allWaCorrect = waLinks.every(link => link.href.includes(whatsappNumber));
  results.push({
    id: 'wa-integrity',
    category: 'Comunicação',
    testName: 'Integridade WhatsApp',
    passed: allWaCorrect && waLinks.length > 0,
    message: allWaCorrect ? `${waLinks.length} botões configurados corretamente.` : 'ERRO: Detectado link com número divergente.'
  });

  // 3. Verificação de Elementos de IA
  const aiButton = document.querySelector('button[type="submit"]');
  const aiInput = document.querySelector('textarea');
  const iaReady = !!(aiButton && aiInput);
  results.push({
    id: 'ai-readiness',
    category: 'IA',
    testName: 'Interface do Assistente',
    passed: iaReady,
    message: iaReady ? 'Componentes de IA montados corretamente.' : 'ERRO: Interface de orçamento incompleta.'
  });

  // 4. Teste de LocalStorage
  try {
    localStorage.setItem('test_probe', '1');
    localStorage.removeItem('test_probe');
    results.push({
      id: 'system-storage',
      category: 'Sistema',
      testName: 'Persistência Local',
      passed: true,
      message: 'Acesso ao LocalStorage está funcional.'
    });
  } catch (e) {
    results.push({
      id: 'system-storage',
      category: 'Sistema',
      testName: 'Persistência Local',
      passed: false,
      message: 'ERRO: LocalStorage bloqueado ou indisponível.'
    });
  }

  return results;
};
