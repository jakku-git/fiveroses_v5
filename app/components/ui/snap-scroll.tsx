import { motion } from "framer-motion";
import { FuzzyOverlay } from "./fuzzy-overlay";

export const SnapScroll = () => {
  return (
    <div className="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory">
      {/* Section 1 */}
      <section className="relative h-screen w-full snap-start overflow-hidden bg-neutral-950">
        <FuzzyOverlay />
        <div className="relative z-20 flex h-full w-full items-center justify-center">
          <p className="text-center text-6xl font-black text-neutral-50">
            Section 1
          </p>
        </div>
      </section>

      {/* Section 2 */}
      <section className="relative h-screen w-full snap-start overflow-hidden bg-neutral-900">
        <FuzzyOverlay />
        <div className="relative z-20 flex h-full w-full items-center justify-center">
          <p className="text-center text-6xl font-black text-neutral-50">
            Section 2
          </p>
        </div>
      </section>

      {/* Section 3 */}
      <section className="relative h-screen w-full snap-start overflow-hidden bg-neutral-800">
        <FuzzyOverlay />
        <div className="relative z-20 flex h-full w-full items-center justify-center">
          <p className="text-center text-6xl font-black text-neutral-50">
            Section 3
          </p>
        </div>
      </section>

      {/* Section 4 */}
      <section className="relative h-screen w-full snap-start overflow-hidden bg-neutral-700">
        <FuzzyOverlay />
        <div className="relative z-20 flex h-full w-full items-center justify-center">
          <p className="text-center text-6xl font-black text-neutral-50">
            Section 4
          </p>
        </div>
      </section>
    </div>
  );
}; 