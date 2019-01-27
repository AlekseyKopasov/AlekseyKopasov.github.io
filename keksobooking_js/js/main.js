'use strict';

(function () {
  var activatePage = function () {
    window.map.activate();
    window.backend.getOffers(onGetOffersSuccess, onGetOffersError);
    window.form.activate(callbackFormSubmit, callbackFormReset);
    window.formPhoto.activate();
  };

  var deactivatePage = function () {
    window.map.deactivate();
    window.filter.deactivate();
    window.form.deactivate();
    window.formPhoto.deactivate();
    window.pins.remove();
    window.popup.close();
    window.mainPin.resetPosition();
    window.form.setAddressValue(window.mainPin.getDefaultPosition());

    isPageActive = false;
  };

  var onPinClick = function (offer) {
    window.popup.open(offer);
  };

  var onFilter = function (filteredOffers) {
    window.popup.close();
    window.pins.remove();
    window.pins.create(filteredOffers, onPinClick);
  };

  var onGetOffersSuccess = function (offers) {
    window.filter.activate(offers, onFilter);
    window.pins.create(offers, onPinClick);
  };

  var onGetOffersError = function () {
    window.message.createErrorMessage();
  };

  var onPostOfferSuccess = function () {
    window.messages.createSuccessMessage();
    deactivatePage();
  };

  var onPostOfferError = function () {
    window.messages.createErrorMessage();
    activatePage();
  };

  var callbackFormSubmit = function (data) {
    window.backend.postOffer(data, onPostOfferSuccess, onPostOfferError);
    deactivatePage();
  };

  var callbackFormReset = function () {
    deactivatePage();
  };

  var isPageActive = false;

  var callbackMainPinMouseUp = function () {
    if (!isPageActive) {
      activatePage();
    }

    isPageActive = true;
  };

  var callbackMainPinMouseMove = function (mainPinPosition) {
    window.form.setAddressValue(mainPinPosition);
  };
  var mapWidth = window.map.getWidth();

  deactivatePage();

  window.mainPin.activate(
      mapWidth,
      callbackMainPinMouseUp,
      callbackMainPinMouseMove
  );
})();
