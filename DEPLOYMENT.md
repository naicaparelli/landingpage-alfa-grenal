# 🚀 Deployment Guide - Railway

## 📋 Pré-requisitos

- Conta no Railway
- Repositório Git configurado
- Node.js 16+ (configurado no `package.json`)

## 🔧 Configuração do Railway

### 1. Variáveis de Ambiente

Configure as seguintes variáveis no Railway:

```bash
# Obrigatórias
VITE_API_URL=https://api.alfasportsbook.com
VITE_WS_URL=wss://ws.alfasportsbook.com
VITE_APP_ENV=production
NODE_ENV=production

# Opcionais
VITE_DEBUG=false
VITE_ANALYTICS_ID=your-analytics-id
```

### 2. Comandos de Deploy

O Railway automaticamente detecta e executa:

```bash
# Build
npm run build

# Start
npm start
```

### 3. Configurações Automáticas

- **Build**: Vite build otimizado
- **Preview**: Servidor de produção na porta dinâmica
- **Health Check**: Endpoint `/` configurado
- **Restart Policy**: Automático em caso de falha

## 🏗️ Estrutura de Build

```
dist/
├── index.html          # Página principal
├── assets/
│   ├── *.css          # Estilos compilados
│   ├── *.js           # JavaScript chunks
│   └── *.js.map       # Source maps
└── _redirects         # Redirecionamentos SPA
```

## 🔍 Verificação de Saúde

- **Endpoint**: `/`
- **Timeout**: 100s
- **Retries**: 3 tentativas

## 📊 Otimizações

- **Code Splitting**: React, Router, Icons separados
- **Compressão**: Gzip habilitado
- **Source Maps**: Disponíveis para debug
- **Caching**: Headers otimizados

## 🐛 Troubleshooting

### Build Falha
```bash
# Teste local
npm run build
npm run preview
```

### Rotas 404
- Verifique se `_redirects` está presente
- Confirme configuração SPA no Railway

### Variáveis de Ambiente
- Confirme prefixo `VITE_` nas variáveis
- Verifique se estão definidas no Railway

## 🎯 Deploy Checklist

- [ ] Variáveis de ambiente configuradas
- [ ] Build local funcionando
- [ ] Preview local funcionando
- [ ] Repositório Git atualizado
- [ ] Railway conectado ao repositório
- [ ] Domínio customizado configurado (opcional)

## 📈 Monitoramento

- Logs disponíveis no Railway Dashboard
- Health checks automáticos
- Métricas de performance integradas 