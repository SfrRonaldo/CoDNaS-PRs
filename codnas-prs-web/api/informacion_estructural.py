import csv

def listarCsv(archivo):
  lista = []
  with open(archivo) as csv_file:
    csv_reader = csv.reader(csv_file, delimiter = ',')
    for row in csv_reader:
      conformero_1, lim_inf_1, lim_sup_1, conformero_2, lim_inf_2, lim_sup_2, sec_similitud, rmsd = row
      if (lim_inf_1 != 'lim_inf_1'):
        lista.append(row)
  return lista

def obtenerInfoEstructural(pdb_id):
  lista_resultados = listarCsv('./Script/CsvFiles/' + pdb_id + '/diversidad_conformacional.csv')
  mayor = 0.0
  menor = 9999.0
  suma_rmsd = 0.0
  lista = []
  for tupla in lista_resultados:
    conformero_1, lim_inf_1, lim_sup_1, conformero_2, lim_inf_2, lim_sup_2, sec_similitud, rmsd = tupla
    if (rmsd == 'nan'):
      pass
    else:
      suma_rmsd = suma_rmsd + float(rmsd)
      if (float(rmsd) > mayor):
        mayor = float(rmsd)
      if (float(rmsd) < menor):
        menor = float(rmsd)
      if (conformero_1 not in lista):
        lista.append(conformero_1)
      if (conformero_2 not in lista):
        lista.append(conformero_2)
  num_conformaciones = len(lista)
  rmsd_avg = round(suma_rmsd / len(lista_resultados), 2)
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