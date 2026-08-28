# SAULO TENÓRIO — Kit Digital da Marca

Pacote de assets para desenvolvimento do site e aplicações digitais.
Derivado do **Manual de Marca & Estratégia Digital 2026**.

**Preparado por:** João Marques (@jvmarrques) · Social Media
**Data:** 24/08/2026 · **Versão:** 1.0

---

## ⚠️ Leia isto primeiro

O logotipo **não pode ser extraído do PDF do manual**. O manual foi gerado
com o logo desenhado em vetor nativo — não existe um arquivo de imagem
embutido para baixar. Os arquivos desta pasta são a **fonte oficial**.

Use sempre os arquivos daqui. Não recorte print do PDF, não redesenhe,
não recrie o logo em CSS.

---

## Estrutura da pasta

```
Saulo-Tenorio_Kit-Digital/
├── 01_logos_svg/     → vetor. É o que você usa no site.
├── 02_logos_png/     → raster com fundo transparente (fallback / e-mail / redes)
├── 03_favicon/       → ícones de navegador, app e avatar
├── 04_elementos/     → filete dourado e barras ascendentes
├── 05_fontes/        → as 3 fontes em .ttf (também estão no Google Fonts)
└── 06_web/           → tokens.css, snippet de <head> e webmanifest
```

---

## 1 · As 4 versões do logo

| Arquivo | Quando usar |
|---|---|
| `logo-horizontal` | **Padrão do site.** Header, rodapé, assinatura de e-mail, cartão |
| `logo-vertical` | Espaços estreitos ou quadrados: capa de vídeo, camiseta, banner |
| `simbolo-escudo` | Favicon, avatar, selo, marca d'água, ícone de app |
| `logo-tipografico` | Sobre foto, marca d'água discreta, rodapé minimalista |

### Variações de cor — escolha pelo fundo

| Sufixo | Cor | Fundo indicado |
|---|---|---|
| `--ouro` | `#C99A3B` + `#E7C87E` | **Marinho ou fundo escuro.** É a versão principal |
| `--marinho` | `#0A1A2F` | Fundo osso `#F2EFE8` ou branco |
| `--branco` | `#FFFFFF` | Foto escura, vídeo, fundo colorido |
| `--grafite` | `#23262B` | Impressão 1 cor, fax, fundo claro sem cor |

**Regra que evita o erro mais comum (Manual p.10):** o logo dourado só respira
sobre fundo escuro. Se a arte tiver foto clara, use uma faixa marinho sólida
atrás do logo **ou** troque para a versão `--branco`. Nunca ouro sobre claro.

---

## 2 · Tamanhos mínimos (Manual p.10)

| Aplicação | Mínimo |
|---|---|
| Logo horizontal em tela | **320 px** de largura |
| Logo horizontal impresso | 50 mm |
| Símbolo escudo | 96 px / 18 mm |
| Marca d'água em vídeo | 7% da largura |

## 3 · Área de respiro

Margem livre ao redor do logo = **altura da letra "S"**, em todos os lados.
Nada entra nessa área: nem texto, nem foto, nem borda, nem outro logo.
No CSS, a classe `.st-logo-wrap` já reserva esse espaço.

## 4 · O que nunca fazer

Trocar as cores · esticar ou comprimir · aplicar sobre foto sem contraste ·
adicionar sombra, brilho ou 3D · trocar a tipografia · rotacionar ou inclinar.

---

## 5 · Cores — cole direto no CSS

| Nome | HEX | RGB | Uso | Peso no layout |
|---|---|---|---|---|
| Marinho Profundo | `#0A1A2F` | 10 · 26 · 47 | Fundo base de tudo | 50% |
| Marinho Médio | `#12283F` | 18 · 40 · 63 | Cards, blocos, camadas | 15% |
| Ouro Tenório | `#C99A3B` | 201 · 154 · 59 | Filetes, ícones, títulos grandes | 12% |
| Ouro Claro | `#E7C87E` | 231 · 200 · 126 | **Texto pequeno dourado** | 5% |
| Osso | `#F2EFE8` | 242 · 239 · 232 | Seções claras | 15% |
| Grafite | `#23262B` | 35 · 38 · 43 | Texto sobre fundo claro | 3% |
| Terracota | `#B3452F` | 179 · 69 · 47 | Único apoio: erro/alerta | — |

**Regra 60·30·10:** 60% marinho, 30% osso ou foto, 10% ouro.
O ouro é tempero, não prato principal.

**Contraste (medido nesta entrega):** sobre Marinho Profundo, o Ouro Claro
`#E7C87E` dá **10,79:1** e o Ouro Tenório `#C99A3B` dá **6,80:1** — os dois
passam em WCAG AA. A regra do manual de usar Ouro Claro em texto pequeno é de
legibilidade óptica, não de reprovação técnica: em corpo miúdo o ouro cheio
"suja" sobre o marinho. Mantenha a regra, mas sem medo de reprovar auditoria.

Todos os pares de cor deste kit foram medidos e passam em AA
(mínimo do conjunto: 6,80:1).

**Cores banidas:** vermelho puro, verde WhatsApp, roxo, degradê arco-íris, neon.
**Nunca use preto puro `#000`** — o preto da marca é Grafite `#23262B`.

---

## 6 · Tipografia

| Fonte | Papel | Regra |
|---|---|---|
| **Cinzel** | Display · nome da marca, títulos | **Só caixa alta.** Nunca em texto corrido |
| **Playfair Display** | Editorial · frases de impacto, citações | Dá peso e permanência |
| **Montserrat** | Texto · corpo, botões, rótulos, CTAs | Pesos 400 / 600 / 700 |

As três são gratuitas no Google Fonts. Estão em `05_fontes/` como fontes
variáveis `.ttf` e o `head-snippet.html` já traz o `<link>` pronto.

**Máximo 2 famílias por peça:** Playfair + Montserrat, **ou** Cinzel + Montserrat.
Nunca as três juntas.

---

## 7 · Como usar no site

**Header (a versão que você vai usar 90% das vezes):**
```html
<a href="/" class="st-logo-wrap">
  <img src="/img/logo-horizontal--ouro.svg"
       alt="Saulo Tenório — Especialista em Saúde Emocional Masculina"
       class="st-logo" width="320" height="86">
</a>
```

**Sobre seção clara:** troque para `logo-horizontal--marinho.svg`.

**Favicon e `<head>`:** copie de `06_web/head-snippet.html`.

**Tokens:** importe `06_web/tokens.css` antes do seu CSS. Todas as cores,
fontes, escala e espaçamentos estão como variáveis `--st-*`.

> **Acessibilidade:** o `alt` do logo deve ser o nome + especialidade, não
> "logo" ou "logotipo". No rodapé, onde o nome já aparece em texto, use `alt=""`.

---

## 8 · Elementos gráficos (`04_elementos/`)

**Filete dourado** — degradê para transparente, da esquerda para a direita.
Separa título de texto. Espessura 2–3 px. Já está em `tokens.css` como
`.st-filete` e `--st-filete`.

**Barras ascendentes** — símbolo de progresso, extraído do logo. Use em blocos
de jornada, evolução e resultado. **Nunca** em bloco que fala de dor.

---

## 9 · Decisão pendente — precisa da confirmação do Saulo

O manual (p.9) recomenda padronizar a grafia para **TENÓRIO, com acento**, em
todas as aplicações. Hoje o perfil alterna entre "TENORIO" e "TENÓRIO", o que
enfraquece o reconhecimento e prejudica a busca.

**Os arquivos deste kit usam TENÓRIO, com acento.** Se o Saulo preferir manter
a grafia sem acento, me avise que eu regero o pacote inteiro — leva minutos.
O que não pode é o site usar uma grafia e o Instagram usar outra.

---

## 10 · O que este kit não cobre

Fotografia, artes de post, template de e-mail e ilustrações não estão aqui.
A direção de fotografia e o tratamento padrão estão no manual (p.13) — vale
ler antes de escolher as imagens do site.

Dúvida sobre aplicação, chama que eu resolvo.
— João
