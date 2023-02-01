const listaMarcas = [
  { marca: "Volkswagen", tasa: 1.5 },
  { marca: "Fiat", tasa: 2 },
  { marca: "Honda", tasa: 0.8 },
  { marca: "Toyota", tasa: 1 },
  { marca: "Peugeot", tasa: 2.5 },
];

const cantvehiculos = SolicitarDato();
if (cantvehiculos !== null){
  cotizar(cantvehiculos);
}


function SolicitarDato() {
  let cantVehiculos = prompt('Ingrese la cantidad de vehiculos a cotizar\nPara salir escriba: "SALIR" ');

if(cantVehiculos.toLowerCase() === "salir"){
  return null
}else if (isNaN(parseInt(cantVehiculos))) {
    alert("Debe ingresar un valor numérico, vuelva a intentarlo");
    SolicitarDato();
  } else if (parseInt(cantVehiculos === 0)) {
    alert("Ingresó 0, vuelva a cargar la pagina para intentarlo");
    return null;
  } else{
    return parseInt(cantVehiculos);
  }
}

function cotizar(cant) {
  const listaCot = new Array(0);

  for (let i = 0; i < cant; i++) {
    let marcaVh = prompt(`Ingrese la marca del vehículo ${i + 1}`);
    let anioVh;
    let sumaVh;
    let tasaVh = validarMarca(marcaVh);
    if (isNaN(tasaVh)) {
      let stringMarcas = "";
      listaMarcas.forEach(
        valor => (stringMarcas = `${stringMarcas}\n - ${valor.marca}`)
      );

      alert(
        `No contamos con el seguro del vehiculo ingresado.\nFavor de ingresar una de las siguientes marcas ${stringMarcas}`
      );

      i = i - 1;
    } else {
      sumaVh = Number(prompt("Ingrese el precio de su vehículo"));
      if (isNaN(sumaVh)) {
        alert("Debe ingresar un valor numérico. Intetelo nuevamente.");
        i = i - 1;
        continue;
      }

      anioVh = parseInt(prompt("Ingrese el año de su vehículo"));
      if (isNaN(anioVh)) {
        alert("Debe ingresar un valor numérico. Intetelo nuevamente.");
        i = i - 1;
        continue;
      }

      let recargoAnio = obtenerRecargoAño(anioVh);
      let costoSeguro = (sumaVh * tasaVh / 1000) *recargoAnio

      listaCot.push({marca: marcaVh, anio: anioVh, suma: sumaVh, costo: costoSeguro});

    }
  }

if (listaCot.length >0){
  let stringCosto = ""
  listaCot.forEach(valor => stringCosto = `${stringCosto}\n - Vhc: ${valor.marca} ${valor.anio} SA: $ ${valor.suma} --> Costo: $ ${valor.costo}`)
  let costoTotal =0;
  listaCot.forEach(valor => costoTotal+= valor.costo);

  alert(`El costo mensual del seguro es: $ ${costoTotal}\nCon los siguientes vehículos:\n${stringCosto}`)


}else{
  alert("No se pudo cotizar con la informacion suministrada")
}

}

function validarMarca(marca) {
  let tasa = undefined;
  listaMarcas.forEach(valor => {
    if (valor.marca.toLowerCase() === marca.toLowerCase()) {
      tasa = valor.tasa;
    }
  });

  return tasa;
}

function obtenerRecargoAño(anio) {
  if (anio < 2010) {
    return 2;
  } else if (anio < 2012) {
    return 1.8;
  } else if (anio < 2016) {
    return 1.5;
  } else if (anio < 2020) {
    return 1.2;
  } else {
    return 1;
  }
}
