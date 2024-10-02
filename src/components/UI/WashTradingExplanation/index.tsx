export const WashTradingExplanation = () => {
  return (
    <section
      className={`flex min-h-screen w-screen flex-col items-center justify-start gap-8 pb-14 pt-16 md:pt-28 text-white`}
    >
      <article id="titles" className={`flex flex-col items-center gap-2`}>
        <span className="text-3xl font-bold  ">
          Wash Trading Detection Tool
        </span>
        <span className="font-medium">
          Read below the parameters for evaluation:
        </span>
      </article>

      <div
        className={`max-w-[350px] rounded-lg bg-gray-800 p-8 shadow-2xl md:max-w-[650px] lg:max-w-[800px] flex flex-col gap-5`}
      >
        <div className={`flex flex-col gap-2`}>
          <span className="text-lg font-medium">
            Frequency of Transactions:
          </span>
          <ul className={`flex list-disc flex-col gap-4 pl-7`}>
            <li>
              Rapid back-and-forth trading of NFTs within a short timeframe.
            </li>
            <li>
              Criteria: Check top 100 sales in the last 7 days and monitor asset
              movement across wallets.
            </li>

            <li>
              Grading:
              <ul className={`list-disc pl-7`}>
                <li> 2 to 4 wallets: 0.1</li>
                <li>6-8 wallets: 0.2</li>
                <li>More than 8 wallets: 0.4</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className={`flex flex-col gap-2`}>
          <span className="text-lg font-medium">Account Activity:</span>
          <ul className={`flex list-disc flex-col gap-4 pl-7`}>
            <li>
              Detect new accounts receiving funds from centralized exchange
              wallets (potential coordinated wash trading).
            </li>
            <li>
              Criteria: Accounts receiving funds from waxonbinance,
              okxtothemars, kcstothemoon, bittrex, and those ending in .c.wam.
            </li>

            <li>
              Grading:
              <ul className={`list-disc pl-7`}>
                <li> 2 to 4 wallets: 0.1</li>
                <li>6-8 wallets: 0.2</li>
                <li>More than 8 wallets: 0.4</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className={`flex flex-col gap-2`}>
          <span className="text-lg font-medium">
            Historical Trading Behavior:
          </span>
          <ul className={`flex list-disc flex-col gap-4 pl-7`}>
            <li>Consider historical collection volumes.</li>
            <li>Detect sudden trading changes signaling abnormal behavior.</li>

            <li>
              Grading:
              <ul className={`list-disc pl-7`}>
                <li>40% 7D volume increase: 0.1</li>
                <li>40-60% 7D volume increase: 0.2</li>
                <li>Over 60% 7D volume increase: 0.3</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className={`flex flex-col gap-2`}>
          <span className="text-lg font-medium">Index Calculation:</span>
          <ul className={`flex list-disc flex-col gap-4 pl-7`}>
            <li>Combine parameters to create an overall wash trading index.</li>
            <li>
              A score close to 0 indicates low likelihood, while a score near 1
              suggests higher probability of wash trading.
            </li>
          </ul>
        </div>{" "}
        In summary, this tool aims to enhance transparency and fairness by
        identifying potential wash trading practices in NFT collections on the
        WAX blockchain.
      </div>
    </section>
  );
};
