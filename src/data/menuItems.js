import { PUBLIC_BUSINESS_INFO, PUBLIC_LINKS } from '../config/publicConfig'
import { sanitizeMultilineText, sanitizePlainText } from '../utils/security'

const comboCustomizationGroups = [
  {
    id: 'meat-point',
    title: 'Qual o ponto da sua carne?',
    type: 'single',
    required: true,
    options: [
      { id: 'rare', label: 'Mal passado', price: 0 },
      { id: 'medium', label: 'Ao ponto', price: 0 },
      { id: 'well-done', label: 'Bem passado', price: 0 },
    ],
  },
  {
    id: 'extras',
    title: 'Que tal um adicional?',
    type: 'multiple',
    options: [
      { id: 'blend-150', label: 'Blend 150g', price: 10 },
      { id: 'bacon', label: 'Bacon', price: 4 },
      { id: 'parmesan-cream', label: 'Creme de parmesao', price: 3 },
      { id: 'cheddar-cream', label: 'Creme cheddar', price: 3 },
      { id: 'pepper-jelly', label: 'Geleia de pimenta', price: 3 },
      { id: 'salad', label: 'Salada', price: 3 },
      { id: 'mozzarella', label: 'Queijo mussarela', price: 3 },
      { id: 'coalho', label: 'Queijo coalho', price: 4 },
      { id: 'caramelized-onion', label: 'Cebola caramelizada', price: 3 },
    ],
  },
  {
    id: 'drink',
    title: 'Escolha sua bebida',
    type: 'single',
    required: true,
    options: [
      { id: 'fanta', label: 'Fanta lata 350ml', price: 0 },
      { id: 'coke', label: 'Coca-Cola lata 350ml', price: 0 },
      { id: 'coke-zero', label: 'Coca-Cola Zero lata 350ml', price: 0 },
      { id: 'guarana', label: 'Guarana lata 350ml', price: 0 },
      { id: 'guava-juice', label: 'Suco goiaba', price: 1 },
      { id: 'acerola-juice', label: 'Suco acerola', price: 1 },
    ],
  },
  {
    id: 'side',
    title: 'Qual seu acompanhamento?',
    type: 'single',
    required: true,
    options: [
      { id: 'fries', label: 'Batata frita', price: 0 },
      {
        id: 'fries-cheddar-bacon',
        label: 'Batata frita com cheddar e bacon',
        price: 5,
      },
      { id: 'onion-rings', label: 'Onion rings', price: 5 },
    ],
  },
  {
    id: 'sauces',
    title: 'Voce deseja saches de molho?',
    type: 'single',
    required: true,
    options: [
      { id: 'ketchup-mayo', label: 'Quero ketchup e maionese', price: 0 },
      { id: 'mayo-only', label: 'Quero so maionese', price: 0 },
      { id: 'ketchup-only', label: 'Quero so ketchup', price: 0 },
      { id: 'no-sauce', label: 'Nao quero', price: 0 },
    ],
  },
]

export const loyaltyProgram = Object.freeze({
  minimumRedemptionPoints: 6,
  pointsPerOrderAmount: 10,
  pointsEarnedPerStep: 1,
  demoStartingPoints: 0,
})

export const loyaltyRewards = [
  {
    id: 'reward-drink',
    name: 'Bebida',
    pointsCost: 8,
    cashPrice: 6,
    image: '/images/fuego/combo-supremo.png',
    description:
      'Com apenas 8 pontos, troque por uma bebida. Se preferir, tambem pode comprar no dinheiro.',
  },
  {
    id: 'reward-fries',
    name: 'Batata Frita',
    pointsCost: 15,
    cashPrice: 11.9,
    image: '/images/fuego/batata-frita.png',
    description:
      'Troque 15 pontos por uma porcao de batata frita crocante ou compre normalmente.',
  },
  {
    id: 'reward-cheddar-combo',
    name: 'Batata Cheddar & Bacon + Refri',
    pointsCost: 22,
    cashPrice: 21.9,
    image: '/images/fuego/batata-cheddar-bacon.png',
    description:
      'Leve um combo rapido com batata cheddar e bacon mais bebida usando seus pontos.',
  },
  {
    id: 'reward-brasa-burger',
    name: 'Brasa Burger',
    pointsCost: 25,
    cashPrice: 29.9,
    image: '/images/fuego/burger-chamas.png',
    description:
      'Esse Brasa e seu por apenas 25 pontos. Caso nao tenha pontos suficientes, pague no dinheiro.',
  },
  {
    id: 'reward-bbq-bacon',
    name: 'Combo BBQ Bacon',
    pointsCost: 35,
    cashPrice: 36.9,
    image: '/images/fuego/combo-brasa.png',
    description:
      'Um combo completo para elevar o valor percebido do programa de fidelidade.',
  },
  {
    id: 'reward-supremo',
    name: 'Combo Supremo',
    pointsCost: 40,
    cashPrice: 36.9,
    image: '/images/fuego/combo-supremo.png',
    description:
      'Resgate o Supremo com 40 pontos ou use a opcao de compra no dinheiro.',
  },
]

export const siteConfig = Object.freeze({
  ...PUBLIC_BUSINESS_INFO,
  heroTitle: 'Fuego Burger & Steak',
  heroSubtitle: 'Burger artesanal com sabor de brasa.',
  heroDescription:
    'Hamburgueres artesanais, combos completos e acompanhamentos feitos para quem busca sabor intenso, praticidade e uma experiencia de delivery mais profissional.',
  logo: '/images/fuego/logo-fuego.png',
  heroImage: '/images/fuego/banner-brasa.jpg',
})

export const navigationItems = [
  { label: 'Inicio', href: '#inicio', id: 'inicio' },
  { label: 'Mais Pedidos', href: '#mais-pedidos', id: 'mais-pedidos' },
  { label: 'Cardapio', href: '#cardapio', id: 'cardapio' },
  { label: 'Combos', href: '#combos', id: 'combos' },
  { label: 'Fidelidade', href: '#fidelidade', id: 'fidelidade' },
  { label: 'Experiencia', href: '#experiencia', id: 'experiencia' },
  { label: 'Contato', href: '#contato', id: 'contato' },
]

export const heroBadges = [
  'Burger artesanal',
  'Pedido rapido pelo WhatsApp',
  'Combos especiais',
]

export const heroStats = [
  {
    title: 'Pedido direto',
    description: 'Clique no item, envie no WhatsApp e feche o pedido em segundos.',
  },
  {
    title: 'Combos completos',
    description: 'Burger, acompanhamento e bebida em opcoes pensadas para conversao.',
  },
  {
    title: 'Programa de pontos',
    description: 'Uma vitrine separada para resgates e fidelidade ajuda a vender mais.',
  },
]

export const benefits = [
  {
    title: 'Pedido direto no WhatsApp',
    description: 'Escolha o item e envie o pedido em poucos cliques.',
    icon: 'whatsapp',
  },
  {
    title: 'Combos completos',
    description: 'Hamburguer, acompanhamento e bebida em opcoes praticas.',
    icon: 'combos',
  },
  {
    title: 'Sabor de brasa',
    description: 'Uma experiencia artesanal com identidade forte.',
    icon: 'brasa',
  },
  {
    title: 'Programa fidelidade',
    description: 'Pontuacao demonstrativa pronta para apresentar trocas e recompensas.',
    icon: 'menu',
  },
]

export const categoryOptions = [
  { id: 'all', label: 'Todas' },
  { id: 'entradas', label: 'Entradas' },
  { id: 'combos-premium', label: 'Combos Premium' },
  { id: 'combos-classicos', label: 'Combos Classicos da Fuego' },
  { id: 'para-dividir', label: 'Para dividir' },
  { id: 'burgers-hot', label: 'Burgers HOT' },
  { id: 'bebidas', label: 'Bebidas' },
]

export const menuItems = [
  {
    id: 'batata-frita',
    name: 'Batata Frita',
    category: 'entradas',
    categoryLabel: 'Entradas',
    price: 11.9,
    description:
      'Batatas fritas, crocantes e sequinhas, temperadas com sal e paprika defumada.',
    image: '/images/fuego/batata-frita.png',
  },
  {
    id: 'batata-cheddar-bacon',
    name: 'Batata Frita Cheddar & Bacon',
    category: 'entradas',
    categoryLabel: 'Entradas',
    price: 16.9,
    description:
      'Batatas fritas crocantes cobertas com cheddar cremoso e bacon.',
    image: '/images/fuego/batata-cheddar-bacon.png',
  },
  {
    id: 'onion-rings',
    name: 'Onion Rings',
    category: 'entradas',
    categoryLabel: 'Entradas',
    price: 16.9,
    description:
      'Cebolas empanadas super crocantes por fora e macias por dentro.',
    image: '/images/fuego/onion-rings.png',
  },
  {
    id: 'dadinho-tapioca',
    name: 'Dadinho de Tapioca',
    category: 'entradas',
    categoryLabel: 'Entradas',
    price: 16.9,
    description: 'Dadinho de tapioca crocante por fora e macio por dentro.',
    image: '/images/fuego/dadinho-tapioca.png',
  },
  {
    id: 'combo-brasinha',
    name: 'Combo Brasinha',
    category: 'combos-classicos',
    categoryLabel: 'Combos Classicos da Fuego',
    price: 31.9,
    description: 'Burger artesanal, batata frita e Fanta lata 350ml.',
    longDescription:
      'Um classico entre nos. Burger artesanal com queijo derretido, batata frita e Fanta lata 350ml para um combo pratico e direto.',
    image: '/images/fuego/combo-brasinha.png',
    defaultSelections: {
      drink: ['fanta'],
      'meat-point': ['medium'],
      sauces: ['ketchup-mayo'],
      side: ['fries'],
    },
    customizationGroups: comboCustomizationGroups,
  },
  {
    id: 'combo-brasa',
    name: 'Combo Brasa',
    category: 'combos-classicos',
    categoryLabel: 'Combos Classicos da Fuego',
    price: 36.9,
    description: 'Burger artesanal, batata frita e Fanta lata 350ml.',
    longDescription:
      'Combo completo da casa com burger artesanal, queijo derretido, batata frita e Fanta lata 350ml em um pedido certeiro para delivery.',
    image: '/images/fuego/combo-brasa.png',
    defaultSelections: {
      drink: ['fanta'],
      'meat-point': ['medium'],
      sauces: ['ketchup-mayo'],
      side: ['fries'],
    },
    customizationGroups: comboCustomizationGroups,
  },
  {
    id: 'combo-supremo',
    name: 'Combo Supremo',
    category: 'combos-classicos',
    categoryLabel: 'Combos Classicos da Fuego',
    price: 36.9,
    description:
      'Burger suculento, batata frita e Coca-Cola lata 350ml.',
    longDescription:
      'Uma opcao intensa e completa com burger robusto, batata frita e Coca-Cola lata 350ml, pronta para um pedido mais premium.',
    image: '/images/fuego/combo-supremo.png',
    defaultSelections: {
      drink: ['coke'],
      'meat-point': ['medium'],
      sauces: ['ketchup-mayo'],
      side: ['fries'],
    },
    customizationGroups: comboCustomizationGroups,
  },
  {
    id: 'combo-churras',
    name: 'Combo Churras',
    category: 'combos-premium',
    categoryLabel: 'Combos Premium',
    price: 41.9,
    description:
      'Blend 150g, cupim desfiado na brasa, cream cheese e picles de cebola roxa.',
    longDescription:
      'Sao 150g de blend de costela bovina suculento, cupim assado lentamente por 6 horas na brasa e desfiado, cream cheese trazendo cremosidade, maionese de alho marcante e picles de cebola roxa equilibrando tudo com aquele toque acido perfeito. Defumado, intenso e simplesmente inesquecivel.',
    image: '/images/fuego/combo-churras.png',
    defaultSelections: {
      drink: ['coke'],
      'meat-point': ['medium'],
      sauces: ['ketchup-mayo'],
      side: ['fries'],
    },
    customizationGroups: comboCustomizationGroups,
  },
  {
    id: 'combo-marajoara',
    name: 'Combo Marajoara',
    category: 'combos-premium',
    categoryLabel: 'Combos Premium',
    price: 41.9,
    description: 'Burger artesanal, batata frita e Guarana lata 350ml.',
    longDescription:
      'Combo premium com burger artesanal, queijo derretido, salada fresca, batata frita e Guarana lata 350ml para uma opcao completa e marcante.',
    image: '/images/fuego/combo-marajoara.png',
    defaultSelections: {
      drink: ['guarana'],
      'meat-point': ['medium'],
      sauces: ['ketchup-mayo'],
      side: ['fries'],
    },
    customizationGroups: comboCustomizationGroups,
  },
  {
    id: 'combo-duplo',
    name: 'Combo Duplo',
    category: 'combos-premium',
    categoryLabel: 'Combos Premium',
    price: 59.9,
    description:
      '2 burgers, 2 bebidas e 1 batata cheddar & bacon em um combo feito para compartilhar.',
    longDescription:
      'Combo robusto com dois burgers artesanais, duas bebidas e uma batata cheddar & bacon para um pedido grande, pratico e com alto apelo visual.',
    image: '/images/fuego/combo-duplo.png',
  },
  {
    id: 'burger-chamas',
    name: 'Burger Chamas',
    category: 'burgers-hot',
    categoryLabel: 'Burgers HOT',
    price: 29.9,
    description:
      'Burger artesanal com onion rings crocante, bacon crispy e sabor intenso.',
    image: '/images/fuego/burger-chamas.png',
  },
  {
    id: 'pudim-leite',
    name: 'Pudim de Leite Condensado',
    category: 'sobremesas',
    categoryLabel: 'Sobremesas',
    price: 8.9,
    description:
      'Delicioso pudim de leite condensado com calda de caramelo, macio e docinho na medida.',
  },
  {
    id: 'brownie-castanha',
    name: 'Brownie de Chocolate com Castanha',
    category: 'sobremesas',
    categoryLabel: 'Sobremesas',
    price: 5.9,
    description:
      'Brownie de chocolate com castanha e textura macia para fechar o pedido com um doce.',
  },
  {
    id: 'porcao-fuego',
    name: 'Porcao Fuego',
    category: 'para-dividir',
    categoryLabel: 'Para dividir',
    price: 29.9,
    description: 'Porcao de batata frita ideal para compartilhar.',
    image: '/images/fuego/batata-frita.png',
  },
  {
    id: 'coca-cola-350',
    name: 'Coca-Cola lata 350ml',
    category: 'bebidas',
    categoryLabel: 'Bebidas',
    price: 7,
    description: 'Refrigerante gelado para completar o combo.',
    image: '/images/fuego/combo-supremo.png',
  },
  {
    id: 'coca-zero-350',
    name: 'Coca-Cola Zero lata 350ml',
    category: 'bebidas',
    categoryLabel: 'Bebidas',
    price: 7,
    description: 'Versao zero acucar para acompanhar seu pedido.',
    image: '/images/fuego/combo-supremo.png',
  },
  {
    id: 'fanta-350',
    name: 'Fanta lata 350ml',
    category: 'bebidas',
    categoryLabel: 'Bebidas',
    price: 7,
    description: 'Bebida gelada para harmonizar com burgers e porcoes.',
    image: '/images/fuego/combo-brasinha.png',
  },
  {
    id: 'guarana-350',
    name: 'Guarana lata 350ml',
    category: 'bebidas',
    categoryLabel: 'Bebidas',
    price: 7,
    description: 'Classico brasileiro para completar seu pedido.',
    image: '/images/fuego/combo-marajoara.png',
  },
  {
    id: 'suco-goiaba-300',
    name: 'Suco Goiaba',
    category: 'bebidas',
    categoryLabel: 'Bebidas',
    price: 7,
    description: 'Garrafa 300ml. Suco batido na hora e 100% natural da fruta.',
    image: '/images/fuego/combo-marajoara.png',
  },
  {
    id: 'suco-acerola-300',
    name: 'Suco Acerola',
    category: 'bebidas',
    categoryLabel: 'Bebidas',
    price: 7,
    description: 'Garrafa 300ml. Opcao natural e refrescante para acompanhar o pedido.',
    image: '/images/fuego/combo-brasa.png',
  },
  {
    id: 'agua-500',
    name: 'Agua Mineral 500ml',
    category: 'bebidas',
    categoryLabel: 'Bebidas',
    price: 3,
    description: 'Garrafa pet de agua mineral de 500ml.',
    image: '/images/fuego/combo-brasa.png',
  },
]

const featuredMetadata = new Map([
  ['combo-brasinha', { tag: 'Novidade!', categoryHighlight: 'Mais Pedidos' }],
  ['combo-marajoara', { tag: 'Novidade!', categoryHighlight: 'Mais Pedidos' }],
  ['dadinho-tapioca', { tag: 'Novidade!', categoryHighlight: 'Mais Pedidos' }],
  ['combo-churras', { tag: 'Novidade!', categoryHighlight: 'Mais Pedidos' }],
])

export const featuredItems = menuItems
  .filter((item) => featuredMetadata.has(item.id))
  .map((item) => ({
    ...item,
    ...featuredMetadata.get(item.id),
  }))

export const comboShowcase = [
  {
    title: 'Combos classicos',
    categoryId: 'combos-classicos',
    description:
      'Pedidos certeiros para quem quer burger, acompanhamento e bebida em uma escolha simples.',
  },
  {
    title: 'Combos premium',
    categoryId: 'combos-premium',
    description:
      'Versoes mais completas para elevar o ticket medio sem perder praticidade.',
  },
  {
    title: 'Burgers HOT',
    categoryId: 'burgers-hot',
    description:
      'Opcoes intensas e marcantes para quem gosta de sabor forte e personalidade.',
  },
  {
    title: 'Entradas e porcoes',
    categoryId: 'entradas',
    description:
      'Acompanhamentos e porcoes que ajudam a completar o pedido e vender mais.',
  },
]

export const experienceItems = [
  {
    title: 'Carne artesanal',
    description:
      'Suculencia, presenca de grelha e identidade para um burger memoravel.',
    icon: 'carne',
  },
  {
    title: 'Pao macio',
    description:
      'Estrutura que segura o burger e deixa a experiencia mais gostosa do primeiro ao ultimo bite.',
    icon: 'pao',
  },
  {
    title: 'Acompanhamentos crocantes',
    description:
      'Batatas, onion rings e porcoes pensadas para entregar textura e desejo.',
    icon: 'acompanhamento',
  },
  {
    title: 'Molhos especiais',
    description:
      'Combinacoes que reforcam a personalidade da marca e diferenciam o cardapio.',
    icon: 'molho',
  },
  {
    title: 'Pedido rapido',
    description:
      'Fluxo simples com botao direto para WhatsApp e mensagem pronta para o cliente.',
    icon: 'rapidez',
  },
  {
    title: 'Fidelidade demonstrativa',
    description:
      'Area pronta para explicar ganhos, contabilidade de pontos e resgates exclusivos.',
    icon: 'premium',
  },
]

export const sectionIds = navigationItems.map((item) => item.id)

export const formatCurrencyBRL = (value) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)

export const formatPoints = (value) => `${value} pts`

export const isItemCustomizable = (item) =>
  Array.isArray(item?.customizationGroups) && item.customizationGroups.length > 0

export const getDefaultSelectionsForItem = (item) =>
  Object.fromEntries(
    (item.customizationGroups ?? []).map((group) => [
      group.id,
      item.defaultSelections?.[group.id] ??
        (group.type === 'single' && group.required ? [group.options[0].id] : []),
    ]),
  )

const findGroupOption = (item, groupId, optionId) =>
  item.customizationGroups
    ?.find((group) => group.id === groupId)
    ?.options.find((option) => option.id === optionId)

export const getCustomizationExtraTotal = (item, selections) =>
  (item.customizationGroups ?? []).reduce((groupSum, group) => {
    const selectedIds = selections[group.id] ?? []

    return (
      groupSum +
      selectedIds.reduce((optionSum, optionId) => {
        const option = findGroupOption(item, group.id, optionId)
        return optionSum + (option?.price ?? 0)
      }, 0)
    )
  }, 0)

export const getCustomizationSummary = (item, selections) =>
  (item.customizationGroups ?? []).flatMap((group) => {
    const selectedIds = selections[group.id] ?? []

    if (!selectedIds.length) {
      return []
    }

    const selectedLabels = selectedIds
      .map((optionId) => findGroupOption(item, group.id, optionId))
      .filter(Boolean)
      .map((option) =>
        option.price > 0
          ? `${option.label} (+${formatCurrencyBRL(option.price)})`
          : option.label,
      )

    return [`${group.title}: ${selectedLabels.join(', ')}`]
  })

export const getCustomizedItemPrice = (item, selections) =>
  item.price + getCustomizationExtraTotal(item, selections)

export const buildWhatsAppLink = (message) => {
  const safeMessage =
    sanitizeMultilineText(message, { maxLength: 1800 }) ||
    'Ola, vim pelo site da Fuego Burger & Steak e gostaria de fazer um pedido.'

  return `${PUBLIC_LINKS.whatsapp}?text=${encodeURIComponent(safeMessage)}`
}

export const buildItemMessage = (itemName) =>
  `Ola, vim pelo site e gostaria de pedir: ${sanitizePlainText(itemName, {
    maxLength: 120,
  })}`

export const buildItemWhatsAppLink = (itemName) =>
  buildWhatsAppLink(buildItemMessage(itemName))

export const getPointsEarnedFromTotal = (cashTotal) =>
  Math.floor(cashTotal / loyaltyProgram.pointsPerOrderAmount) *
  loyaltyProgram.pointsEarnedPerStep

export const buildCartMessage = ({
  cartItems,
  availablePoints = 0,
  pointsSpent = 0,
  pointsEarned = 0,
  projectedPoints = 0,
}) => {
  if (!cartItems.length) {
    return 'Ola, vim pelo site da Fuego Burger & Steak e gostaria de fazer um pedido.'
  }

  const cashItems = cartItems.filter((item) => item.paymentType !== 'points')
  const pointItems = cartItems.filter((item) => item.paymentType === 'points')
  const cashTotal = cashItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )
  const sections = [
    'Ola, vim pelo site da Fuego Burger & Steak e gostaria de fazer este pedido:',
  ]

  if (cashItems.length) {
    sections.push('', 'Itens pagos em dinheiro:')
    cashItems.forEach((item) => {
      sections.push(
        `${item.quantity}x ${sanitizePlainText(item.name, { maxLength: 120 })} - ${formatCurrencyBRL(item.price)}`,
      )
      item.summaryLines?.forEach((summaryLine) => {
        sections.push(`  - ${sanitizePlainText(summaryLine, { maxLength: 200 })}`)
      })
    })
  }

  if (pointItems.length) {
    sections.push('', 'Itens resgatados com pontos:')
    pointItems.forEach((item) => {
      sections.push(
        `${item.quantity}x ${sanitizePlainText(item.name, { maxLength: 120 })} - ${formatPoints(item.pointsCost)}`,
      )
      item.summaryLines?.forEach((summaryLine) => {
        sections.push(`  - ${sanitizePlainText(summaryLine, { maxLength: 200 })}`)
      })
    })
  }

  sections.push('', `Total em dinheiro: ${formatCurrencyBRL(cashTotal)}`)

  if (pointsSpent > 0) {
    sections.push(`Pontos utilizados: ${formatPoints(pointsSpent)}`)
  }

  sections.push(`Pontos ganhos nesta compra: ${formatPoints(pointsEarned)}`)
  sections.push(`Saldo informado no site: ${formatPoints(availablePoints)}`)
  sections.push(`Saldo projetado apos o pedido: ${formatPoints(projectedPoints)}`)

  return sections.join('\n')
}

export const buildCartWhatsAppLink = (payload) =>
  buildWhatsAppLink(buildCartMessage(payload))

export const quickOrderLink = buildWhatsAppLink(
  'Ola, vim pelo site da Fuego Burger & Steak e gostaria de fazer um pedido.',
)
