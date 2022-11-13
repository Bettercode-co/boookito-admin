import React from "react";
import PropTypes from "prop-types";
import { CardStatsProps } from "../../interfaces";

const CardStats: React.FC<CardStatsProps> = ({
  statSubtitle,
  statTitle,
  statIconName,
  statIconColor,
}) => {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded my-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-slate-400 uppercase font-bold text-xs">
                {statSubtitle}
              </h5>
              <span className="font-semibold text-xl text-slate-700">
                {statTitle}
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div
                className={
                  "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " +
                  statIconColor
                }
              >
                <i>{statIconName}</i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardStats;

CardStats.defaultProps = {
  statSubtitle: "Traffic",
  statTitle: "350,897",
};

CardStats.propTypes = {
  statSubtitle: PropTypes.string,
  statTitle: PropTypes.string,
};
