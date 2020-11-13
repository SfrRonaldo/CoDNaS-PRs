import Bio
from Bio.PDB import PDBParser, PDBIO, PDBList
import csv
import itertools
import os
import subprocess

def descargarPDB(pdb):
  pdbl = PDBList()
  pdbl.retrieve_pdb_file(pdb, pdir = './Script/PDB', file_format = 'pdb')
  parser = PDBParser()
  ent_file ='./Script/PDB/pdb' + pdb.lower() + '.ent'
  structure = parser.get_structure(pdb, ent_file)
  io = PDBIO()
  io.set_structure(structure)
  pdb_structure_file = './Script/PDBStructure/' + pdb + '.pdb'
  io.save(pdb_structure_file)

def generarPDBFile(pdb, chain, model):
  dir_pdb_structure = './Script/PDBStructure/' + pdb + '.pdb'
  pdb_structure = open(dir_pdb_structure, 'r')
  flag = 0
  es_model = 0
  alterna = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  if (model == 0):
    name_out_file = './Script/PDBFiles/' + pdb + '_' + chain + '.pdb'
    out_file = open(name_out_file, 'w')
    for linea in pdb_structure.readlines():
      line = linea.split()
      if (line[0] == 'ATOM'):
        if (len(line[4]) == 1):
          if (len(line[5]) == 1 and line[5] in alterna):
            try:
              if (line[4] == chain):
                flag = 1
                out_file.write(linea)
            except:
              if (line[5] == chain):
                flag = 1
                out_file.write(linea)
          elif (len(line[5]) != 1):
            try:
              if (line[4] == chain):
                flag = 1
                out_file.write(linea)
            except:
              if (line[5] == chain):
                flag = 1
                out_file.write(linea)
        elif (len(line[4]) > 1):
          if (line[4][0] == chain):
            flag = 1
            out_file.write(linea)
      elif (line[0] == 'TER' and flag):
        out_file.write(linea)
        break
  else:
    name_out_file = './Script/PDBFiles/' + pdb + '_' + chain + '-' + model + '.pdb'
    out_file = open(name_out_file, 'w')
    for linea in pdb_structure.readlines():
      line = linea.split()
      if (line[0] == 'MODEL'):
        if (line[1] == model):
          es_model = 1
        else:
          es_model = 0
      if (line[0] == 'ATOM' and es_model):
        if (len(line[4]) == 1):
          if (len(line[5]) == 1 and line[5] in alterna):
            try:
              if (line[4] == chain):
                flag = 1
                out_file.write(linea)
            except:
              if (line[5] == chain):
                flag = 1
                out_file.write(linea)
          elif (len(line[5]) != 1):
            try:
              if (line[4] == chain):
                flag = 1
                out_file.write(linea)
            except:
              if (line[5] == chain):
                flag = 1
                out_file.write(linea)
        elif (len(line[4]) > 1):
          if (line[4][0] == chain):
            flag = 1
            out_file.write(linea)
      if (line[0] == 'TER' and es_model and flag):
        out_file.write(linea)
        break
  pdb_structure.close()
  out_file.close()

def generarConformersFiles(lista):
  for item in lista:
    if ('-' in item):
      conformer = item.split('_')
      pdb = conformer[0]
      conformer = conformer[1].split('-')
      chain = conformer[0]
      model = conformer[1]
    else:
      conformer = item.split('_')
      pdb = conformer[0]
      chain = conformer[1]
      model = 0
    #descargarPDB(pdb)
    generarPDBFile(pdb, chain, model)

def crearDirectorios(directorio):
  os.makedirs(directorio, exist_ok = True)

def alinearEstructuras(path_conformer_1, path_conformer_2, conformer, pdb):
  ubicacion = './Script/SupFiles/' + pdb + '/' + conformer + '/' + conformer + '.sup'
  subprocess.call(['./TMalign', path_conformer_1, path_conformer_2, '-a', 'T', '-o', ubicacion])

def limpiar(conformer, pdb):
  directorio = './Script/SupFiles/' + pdb + '/' + conformer + '/'
  lista = os.listdir(directorio)
  l = []
  for item in lista:
    l.append('./Script/SupFiles/' + pdb + '/' + conformer + '/' + item)
  subprocess.call(['rm', l[1], l[2], l[3], l[4], l[5], l[6], l[7], l[8], l[9], l[10], l[11], l[12], l[13], l[14]])

def generarSupFiles(lista, pdb_id, pdb):
  for conformer in lista:
    crearDirectorios('./Script/SupFiles/' +  pdb + '/' + conformer)
    conformer_1 = './Script/Conformers/' + pdb + '/' + pdb_id + '.pdb'
    conformer_2 = './Script/PDBFiles/' + conformer + '.pdb'
    alinearEstructuras(conformer_1, conformer_2, conformer, pdb)
    limpiar(conformer, pdb)

def generarRegionConformerFile(conformer, lim_inf, lim_sup, pdb_id):
  name_out_file = './Script/Conformers/' + pdb_id + '/' + conformer + '_' + lim_inf + '_' + lim_sup + '.pdb'
  out_file = open(name_out_file, 'w')
  is_final = 0
  archivo = open('./Script/PDBFiles/' + conformer + '.pdb', 'r')
  for linea in archivo.readlines():
    line = linea.split()
    if (line[0] == 'ATOM'):
      if (len(line[4]) == 1):
        try:
          if (line[4] == conformer[5:6]):
            if (int(lim_inf) <= int(line[5]) and int(line[5]) <= int(lim_sup)):
              is_final = 1
              out_file.write(linea)
            elif (is_final):
              out_file.write(linea)
              break
        except:
          if (line[5] == conformer[5:6]):
            if (int(lim_inf) <= int(line[6]) and int(line[6]) <= int(lim_sup)):
              is_final = 1
              out_file.write(linea)
            elif (is_final):
              out_file.write('TER')
              break
      else:
        identifier = line[4][1:len(line[4])]
        if (line[4][0] == conformer[5:6]):
          if (int(lim_inf) <= int(identifier) and int(identifier) <= int(lim_sup)):
            is_final = 1
            out_file.write(linea)
          elif (is_final):
            out_file.write(linea)
            break
    elif (line[0] == 'TER' and is_final):
      out_file.write('TER')
      break
  archivo.close()
  out_file.close()

def identificarRegiones(pdb_id):
  lista_conformeros = os.listdir('./Script/SupFiles/' + pdb_id)
  for conformero in lista_conformeros:
    archivo = open('./Script/SupFiles/' + pdb_id + '/' + conformero + '/' + conformero + '.sup', 'r')
    i = 1
    for linea in archivo.readlines():
      if (i == 8):
        linea = linea.split()
        if (len(linea) == 3):
          linea = linea[2].split(':')
          lim_inf = linea[0]
        else:
          linea = linea[1].split(',')
          linea = linea[1].split(':')
          lim_inf = linea[0]
      elif (i > 8):
        linea = linea.split()
        if (linea[0] == 'select' and linea[1] == 'all'):
          tupla = lim_inf, lim_sup
          break
        if (linea[0] == 'select'):
          if (len(linea) == 3):
            linea = linea[2].split(':')
            lim_sup = linea[0]
          else:
            linea = linea[1].split(',')
            linea = linea[1].split(':')
            lim_sup = linea[0]
      i = i + 1
    archivo.close()
    generarRegionConformerFile(conformero, tupla[0], tupla[1], pdb_id)

def calcularRMSD(conformer_1, conformer_2):
  subprocess.call(['./mymammoth', '-p', conformer_1, '-e', conformer_2, '-o', './Script/TextFiles/output_rmsd.txt'])

def diversidadConformacional(pdb, pdb_id):
  lista_DC = []
  lista = os.listdir('./Script/Conformers/' + pdb)
  pares = list(itertools.combinations(lista, 2))
  if (len(pares) < 100):
    for tupla in pares:
      conformer1, conformer2 = tupla
      aux = conformer1.split('_')
      pdb_conformer1 = aux[0]
      chain_conformer1 = aux[1]
      lim_inf_conformer1 = aux[2]
      aux = aux[3].split('.')
      lim_sup_conformer1 = aux[0]
      aux = conformer2.split('_')
      pdb_conformer2 = aux[0]
      chain_conformer2 = aux[1]
      lim_inf_conformer2 = aux[2]
      aux = aux[3].split('.')
      lim_sup_conformer2 = aux[0]
      conformer_1 = './Script/Conformers/' + pdb + '/' + conformer1
      conformer_2 = './Script/Conformers/' + pdb + '/' + conformer2
      calcularRMSD(conformer_1, conformer_2)
      rmsd_file = open('./Script/TextFiles/output_rmsd.txt', 'r')
      for linea in rmsd_file.readlines():
        if ('Sstr(LG)' in linea):
          line = linea.split()
          rmsd = line[7]
        if ('Seq.sim=' in linea):
          line = linea.split()
          pair = pdb_conformer1 + '_' + chain_conformer1, rmsd, line[3], lim_inf_conformer1, lim_sup_conformer1, pdb_conformer2 + '_' + chain_conformer2, lim_inf_conformer2, lim_sup_conformer2
          lista_DC.append(pair)
          break
  else:
    for conformer in lista:
      if (pdb not in conformer):
        aux = conformer.split('_')
        pdb_conformer = aux[0]
        chain_conformer = aux[1]
        lim_inf = aux[2]
        aux = aux[3].split('.')
        lim_sup = aux[0]
        conformer_1 = './Script/Conformers/' + pdb + '/' + pdb_id + '.pdb'
        conformer_2 = './Script/Conformers/' + pdb + '/' + conformer
        calcularRMSD(conformer_1, conformer_2)
        rmsd_file = open('./Script/TextFiles/output_rmsd.txt', 'r')
        for linea in rmsd_file.readlines():
          if ('Sstr(LG)' in linea):
            line = linea.split()
            rmsd = line[7]
          if ('Seq.sim=' in linea):
            line = linea.split()
            pair = pdb_conformer + '_' + chain_conformer, rmsd, line[3], lim_inf, lim_sup, pdb, lim_inf, lim_sup
            lista_DC.append(pair)
            break
  return lista_DC

def generarCsv(lista, pdb):
  directorio = './Script/CsvFiles/' + pdb + '/'
  crearDirectorios(directorio)
  with open(directorio + 'diversidad_conformacional.csv', 'w') as out_file:
    csv_writer = csv.writer(out_file, delimiter = ',', lineterminator = '\n')
    csv_writer.writerow(['conformero_1', 'lim_inf_1', 'lim_sup_1', 'conformero_2', 'lim_inf_2', 'lim_sup_2', 'sec_similitud', 'rmsd'])
    for row in lista:
      conformero_1, rmsd, sec_simi, lim_inf_1, lim_sup_1, conformero_2, lim_inf_2, lim_sup_2 = row
      csv_writer.writerow([conformero_1, lim_inf_1, lim_sup_1, conformero_2, lim_inf_2, lim_sup_2, sec_simi, rmsd])

def obtener(lista, pdb_id):
  _pdbId = pdb_id.split('_')
  pdb = _pdbId[0]
  chain = _pdbId[1]
  lim_inf = _pdbId[2]
  lim_sup = _pdbId[3]
  generarPDBFile(pdb, chain, 0)
  crearDirectorios('./Script/Conformers/' + pdb + '_' + chain)
  generarRegionConformerFile(pdb + '_' + chain, lim_inf, lim_sup, pdb + '_' + chain)
  generarConformersFiles(lista)
  generarSupFiles(lista, pdb_id, pdb + '_' + chain)
  identificarRegiones(pdb + '_' + chain)
  lista = diversidadConformacional(pdb + '_' + chain, pdb_id)
  generarCsv(lista, pdb + '_' + chain)
  conformaciones = []
  for item in lista:
    conformero_1, rmsd, sec_simi, lim_inf_1, lim_sup_1, conformero_2, lim_inf_2, lim_sup_2 = item
    if (conformero_1 == pdb + '_' + chain):
      conformacion = {
        "pdb_id": pdb + '_' + chain,
        "conformero": conformero_2,
        "lim_inf": int(lim_inf_2),
        "lim_sup": int(lim_sup_2),
        "sec_similitud": float(sec_simi),
        "rmsd": float(rmsd)
      }
      conformaciones.append(conformacion)
    if (conformero_2 == pdb + '_' + chain):
      conformacion = {
        "pdb_id": pdb + '_' + chain,
        "conformero": conformero_1,
        "lim_inf": int(lim_inf_1),
        "lim_sup": int(lim_sup_1),
        "sec_similitud": float(sec_simi),
        "rmsd": float(rmsd)
      }
      conformaciones.append(conformacion)  
  return conformaciones