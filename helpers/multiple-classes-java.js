module.exports = (titleChallenge) => {
    switch (titleChallenge) {
        case 'Calculadora':
            return `intergrupo.algoritmos.calculadoraImpl.tests.DividirTests intergrupo.algoritmos.calculadoraImpl.tests.SumarTests intergrupo.algoritmos.calculadoraImpl.tests.RestarTests intergrupo.algoritmos.calculadoraImpl.tests.MultiplicarTests`;
        case 'Conjuntos':
            return `intergrupo.algoritmos.conjuntosImpl.tests.DiferenciaSimetricaTests intergrupo.algoritmos.conjuntosImpl.tests.DiferenciaTests intergrupo.algoritmos.conjuntosImpl.tests.InterseccionTests intergrupo.algoritmos.conjuntosImpl.tests.UnionTests`;
        case 'Palindromo':
            return `intergrupo.algoritmos.palindromoImpl.tests.EvaluarPalindromoTests`;
        case 'Poblacion':
            return `intergrupo.algoritmos.poblacionImpl.tests.ProyectarPoblacionTests`;
        case 'Romanos':
            return `intergrupo.algoritmos.romanosImpl.tests.ConvertirARomanoTests`;
        case 'Area':
            return `intergrupo.algoritmos.areaImpl.tests.CirculoTests intergrupo.algoritmos.areaImpl.tests.RectanguloTests intergrupo.algoritmos.areaImpl.tests.TrianguloTests`;
        case 'Arbol Binario' || 'ArbolBinario':
            return 'intergrupo.algoritmos.areaImpl.tests.ObtenerPathTests';
        case 'Buscaminas':
            return 'intergrupo.algoritmos.buscaminasImpl.tests.AgregarMinaTests intergrupo.algoritmos.buscaminasImpl.tests.ObtenerArregloBuscaminasTests';
    }
};