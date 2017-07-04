var expect = require("chai").expect;
var challenge_detail = require("../../middlewares/challenges-detail-middleware");

describe("challenge-detail-middleware", function() {
    describe("#getUserChallengeScore", function() {
        it("registrosDentroTiempoPrueba_obtieneScoreDentroDeMayor", function() {
            challenge_detail.getUserScore('id', 'challenge', req)
        });
        it("registrosFueraTiempoPrueba_obtieneScoreMenorAMaximoDentroTiempo", function() {

        });
    });
});