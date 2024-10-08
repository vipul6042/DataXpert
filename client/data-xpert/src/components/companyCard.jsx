import React from "react";
import PropTypes from "prop-types";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";

countries.registerLocale(en);

const getCountryCode = (country) => {
  const countryCode = countries.getAlpha2Code(country, "en");
  return countryCode ? countryCode.toLowerCase() : "unknown";
};

const CompanyCard = ({ logourl, companyName, country }) => {
  const countryCode = getCountryCode(country);
  const flagUrl = `https://flagcdn.com/w40/${countryCode}.png`;

  return (
    <div className="bg-white rounded-xl shadow-lg m-4 p-6 text-center w-fit">
      <div className="flex flex-row items-center justify-center gap-4">
        <img
          src={logourl}
          alt="logo"
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div className="flex-col gap-2 flex items-start">
          <h2 className="text-3xl font-serif font-bold">{companyName}</h2>

          <div className="flex items-center justify-center text-gray-600">
            <img
              src={flagUrl}
              alt={`${country} flag`}
              className="w-6 h-6 mr-2"
            />
            <span className="text-lg">{country}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

CompanyCard.propTypes = {
  logourl: PropTypes.elementType.isRequired,
  companyName: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
};

export default CompanyCard;
