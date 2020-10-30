import Bio
from Bio.PDB import PDBParser, PDBIO, PDBList

def descargarPDB(pdb):
  pdbl = PDBList()
  pdbl.retrieve_pdb_file(pdb, pdir = './Script/PDB', file_format = 'pdb')
  parser = PDBParser()
  ent_file ='./Script/PDB/pdb' + pdb + '.ent'
  structure = parser.get_structure(pdb, ent_file)
  io = PDBIO()
  io.set_structure(structure)
  pdb_structure_file = './Script/PDBStructure/' + pdb + '.pdb'
  io.save(pdb_structure_file)

def obtenerInfoGeneral(pdb_id):
  pdb_id = pdb_id.split('_')
  pdb = pdb_id[0]
  chain = pdb_id[1]
  lim_inf = pdb_id[2]
  lim_sup = pdb_id[3]
  flag = 1
  titulo = ''
  nombre = ''
  organismo = ''
  archivo = open('./Script/PDB/pdb' + pdb.lower() + '.ent', 'r')
  for linea in archivo.readlines():
    linea = linea.split()
    size = len(linea)
    if (linea[0] == 'HEADER'):
      j = 2
      clasificacion = linea[1]
      while (j < size - 2):
        clasificacion = clasificacion + ' ' + linea[j]
        j = j + 1
    if (linea[0] == 'TITLE'):
      j = 2
      if (titulo == ''):
        titulo = linea[1]
      while (j < size):
        titulo = titulo + ' ' + linea[j]
        j = j + 1
    if (linea[0] == 'COMPND'):
      if (linea[2] == 'MOLECULE:' and flag):
        j = 4
        nombre = linea[3]
        while (j < size):
          nombre = nombre + ' ' + linea[j]
          j = j + 1
        nombre = nombre[:len(nombre)-1]
      if (linea[2] == 'MOLECULE:;' and flag):
        nombre = ''
      if (linea[2] == 'CHAIN:'):
        if (',' in linea[3]):
          if (linea[4][:1] == chain):
            flag = 0
        if (linea[3][:1] == chain):
          flag = 0
    if (linea[0] == 'SOURCE'):
      if (linea[2] == 'ORGANISM_SCIENTIFIC:'):
        j = 4
        organismo = linea[3]
        while (j < size):
          organismo = organismo + ' ' + linea[j]
          j = j + 1
        organismo = organismo[:len(organismo)-1]
        break
  if (organismo == ''):
    organismo = 'no_data'
  if (nombre == ''):
    nombre = 'no_data'
  region_repetida = '[' + lim_inf + ' - ' + lim_sup + ']'
  info_estructural = {
    "pdb_id": pdb+'_'+chain,
    "nombre_proteina": nombre,
    "titulo": titulo,
    "organismo": organismo,
    "region_repetida": region_repetida,
    "clasificacion": clasificacion,
  }
  return info_estructural

def obtener(pdb_id):
  descargarPDB(pdb_id[:4])
  info_general = obtenerInfoGeneral(pdb_id)
  return info_general