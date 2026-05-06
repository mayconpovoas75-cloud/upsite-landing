import {
  Gift,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from 'lucide-react'
import {
  formatCurrencyBRL,
  formatPoints,
  loyaltyProgram,
  loyaltyRewards,
} from '../data/menuItems'
import SectionHeading from './SectionHeading'
import SmartImage from './SmartImage'

const LoyaltySection = ({
  availablePoints,
  pointsEarned,
  pointsSpent,
  projectedPoints,
  rewardCounts,
  onBuyRewardCash,
  onRedeemReward,
}) => (
  <section
    className="py-24"
    id="fidelidade"
  >
    <div className="section-container">
      <SectionHeading
        eyebrow="Fidelidade"
        title="Itens exclusivos para troca de pontos fidelidade"
        description="A cada R$10 em compras concluidas, o cliente ganha 1 ponto. Com no minimo 6 pontos, ja pode trocar por itens selecionados."
      />

      <div
        className="panel reveal mt-10 overflow-hidden"
        data-reveal=""
      >
        <div className="bg-[linear-gradient(180deg,rgba(28,10,7,0.98),rgba(17,6,4,0.98))] px-6 py-10 sm:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sand">
              Programa de fidelidade
            </p>
            <h3 className="mt-4 font-display text-6xl tracking-[0.08em] text-cream sm:text-7xl">
              Como funciona?
            </h3>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-cream/74">
              A cada {formatCurrencyBRL(loyaltyProgram.pointsPerOrderAmount)} em
              compra de pedidos concluidos, voce ganha{' '}
              {formatPoints(loyaltyProgram.pointsEarnedPerStep)}. Acumule no
              minimo {formatPoints(loyaltyProgram.minimumRedemptionPoints)} e
              troque por itens da vitrine abaixo de acordo com sua pontuacao.
            </p>
          </div>
        </div>

        <div className="grid gap-4 border-t border-white/10 bg-[#f5e7d0]/[0.03] px-6 py-6 sm:grid-cols-2 xl:grid-cols-4 xl:px-8">
          <div className="stat-card">
            <WalletCards className="h-5 w-5 text-flame" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sand">
                Saldo atual
              </p>
              <div className="mt-3 rounded-full border border-white/10 bg-black/20 px-4 py-3 text-center">
                <p className="font-display text-4xl tracking-[0.05em] text-cream">
                  {formatPoints(availablePoints)}
                </p>
              </div>
              <p className="mt-3 text-sm leading-6 text-cream/62">
                Este saldo deve vir do historico real do cliente. Nao existe ajuste manual na interface.
              </p>
            </div>
          </div>

          <div className="stat-card">
            <Gift className="h-5 w-5 text-flame" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sand">
                Pontos usados
              </p>
              <p className="mt-3 font-display text-4xl tracking-[0.05em] text-cream">
                {formatPoints(pointsSpent)}
              </p>
            </div>
          </div>

          <div className="stat-card">
            <Sparkles className="h-5 w-5 text-flame" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sand">
                Pontos pendentes
              </p>
              <p className="mt-3 font-display text-4xl tracking-[0.05em] text-cream">
                {formatPoints(pointsEarned)}
              </p>
              <p className="mt-3 text-sm leading-6 text-cream/62">
                So entram no saldo apos a finalizacao e confirmacao do pedido.
              </p>
            </div>
          </div>

          <div className="stat-card">
            <ShieldCheck className="h-5 w-5 text-flame" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sand">
                Saldo apos confirmacao
              </p>
              <p className="mt-3 font-display text-4xl tracking-[0.05em] text-cream">
                {formatPoints(projectedPoints)}
              </p>
              <p className="mt-3 text-sm leading-6 text-cream/62">
                Projecao considerando somente a conclusao deste pedido.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-[#f5e7d0]/[0.03] px-6 py-4 text-center text-sm text-cream/70">
          Se o cliente nao tiver pontos suficientes para resgatar algum item, a
          vitrine tambem mostra a opcao de compra em dinheiro. Pontos novos so
          ficam disponiveis depois da compra ser concluida.
        </div>
      </div>

      <div className="mt-10 grid gap-5">
        {loyaltyRewards.map((reward, index) => {
          const inCartCount = rewardCounts[reward.id] ?? 0
          const canRedeem = availablePoints - pointsSpent >= reward.pointsCost

          return (
            <article
              key={reward.id}
              className="panel-soft reveal overflow-hidden p-4 sm:p-5"
              data-reveal=""
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <div className="grid gap-4 sm:grid-cols-[160px_minmax(0,1fr)]">
                <SmartImage
                  alt={reward.name}
                  className="aspect-[4/3] sm:aspect-[1/1]"
                  roundedClassName="rounded-[22px]"
                  src={reward.image}
                  subtitle="Fidelidade"
                  title={reward.name}
                />

                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">
                          Fidelidade - {formatPoints(reward.pointsCost)}
                        </span>
                        <span className="rounded-full bg-[#f5e7d0]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-sand">
                          Fidelidade
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-4xl tracking-[0.05em] text-cream">
                        {reward.name}
                      </h3>
                    </div>

                    {inCartCount > 0 ? (
                      <span className="rounded-full border border-flame/20 bg-flame/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-sand">
                        {inCartCount} no carrinho
                      </span>
                    ) : null}
                  </div>

                  <p className="max-w-3xl text-sm leading-7 text-cream/68">
                    {reward.description}
                  </p>

                  <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cream/44">
                        Valor em dinheiro
                      </p>
                      <p className="font-display text-4xl tracking-[0.05em] text-cream">
                        {formatCurrencyBRL(reward.cashPrice)}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <button
                        className={`btn-primary ${canRedeem ? '' : 'opacity-50'}`}
                        disabled={!canRedeem}
                        type="button"
                        onClick={() => onRedeemReward(reward)}
                      >
                        Resgatar com {formatPoints(reward.pointsCost)}
                      </button>
                      <button
                        className="btn-secondary"
                        type="button"
                        onClick={() => onBuyRewardCash(reward)}
                      >
                        Comprar no dinheiro
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  </section>
)

export default LoyaltySection
