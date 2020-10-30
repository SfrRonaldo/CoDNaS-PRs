import csv

def listarCsv(archivo):
  lista = []
  with open(archivo) as csv_file:
    csv_reader = csv.reader(csv_file, delimiter = ',')
    for row in csv_reader:
      conformero, lim_inf, lim_sup, sec_similitud, rmsd = row
      if (lim_inf != 'lim_inf'):
        lista.append(row)
  return lista

def obtenerInfoEstructural(pdb_id):
  lista_resultados = listarCsv('./Script/CsvFiles/' + pdb_id + '/diversidad_conformacional.csv')
  mayor = 0.0
  menor = 9999.0
  suma_rmsd = 0.0
  for tupla in lista_resultados:
    conformero, lim_inf, lim_sup, sec_similitud, rmsd = tupla
    suma_rmsd = suma_rmsd + float(rmsd)
    if (float(rmsd) > mayor):
      mayor = float(rmsd)
    if (float(rmsd) < menor):
      menor = float(rmsd)
  num_conformaciones = len(lista_resultados) + 1
  rmsd_avg = round(suma_rmsd / (num_conformaciones - 1), 2)
  info_estructural = {
    "pdb_id": pdb_id,
    "num_conformaciones": num_conformaciones,
    "rmsd_min": float(menor),
    "rmsd_max": float(mayor),
    "rmsd_avg": rmsd_avg,
  }
  return info_estructural


def obtener(pdb_id):
  _pdbId = pdb_id.split('_')
  pdb = _pdbId[0]
  chain = _pdbId[1]
  info_estructural = obtenerInfoEstructural(pdb + '_' + chain)
  return info_estructural