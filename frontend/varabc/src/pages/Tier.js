import copper from '../img/tier/copper.png'
import iron from '../img/tier/iron.png'
import bronze from '../img/tier/bronze.png'
import silver from '../img/tier/silver.png'
import gold from '../img/tier/gold.png'
import diamond from '../img/tier/diamond.png'

export const Tier = () => {
  return (
    <div>
      <div className="w-full h-screen bg-bg2 bg-cover">
        <div className="flex flex-col items-center p-[20px]">
          <div className="w-10/12 flex justify-center pt-[20px]">
            <div className="w-3/12 flex flex-col items-center">
              <img src={copper} alt="copper" className="w-[200px] h-[200px] object-cover"/>
              <p className="text-white font-bold text-4xl">COPPER</p>
              <p className="text-white text-2xl">0 EXP ~ 20 EXP</p>
            </div>
            <div className="w-3/12 flex flex-col items-center">
              <img src={iron} alt="iron" className="w-[200px] h-[200px] object-cover"/>
              <p className="text-white font-bold text-4xl">IRON</p>
              <p className="text-white text-2xl">20 EXP ~ 50 EXP</p>
            </div>
            <div className="w-3/12 flex flex-col items-center">
              <img src={bronze} alt="bronze" className="w-[200px] h-[200px] object-cover"/>
              <p className="text-white font-bold text-4xl">BRONZE</p>
              <p className="text-white text-2xl">50 EXP ~ 200 EXP</p>
            </div>
          </div>
          <div className="w-10/12 flex justify-center">
            <div className="w-3/12 flex flex-col items-center">
              <img src={silver} alt="silver" className="w-[200px] h-[200px] object-cover"/>
              <p className="text-white font-bold text-4xl">SILVER</p>
              <p className="text-white text-2xl">200 EXP ~ 500 EXP</p>
            </div>
            <div className="w-3/12 flex flex-col items-center">
              <img src={gold} alt="gold" className="w-[200px] h-[200px] object-cover"/>
              <p className="text-white font-bold text-4xl">GOLD</p>
              <p className="text-white text-2xl">500 EXP ~ 1500 EXP</p>
            </div>
            <div className="w-3/12 flex flex-col items-center">
              <img src={diamond} alt="diamond" className="w-[200px] h-[200px] object-cover"/>
              <p className="text-white font-bold text-4xl">DIAMOND</p>
              <p className="text-white text-2xl">1500 EXP ~ </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
