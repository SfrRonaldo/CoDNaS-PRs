import subprocess
import os

def limpiarData(directorio):
  lista = os.listdir(directorio)
  carpetas = []
  for item in lista:
    carpetas.append(directorio + item)
  for carpeta in carpetas:
    subprocess.call(["rm", "-r", carpeta])

def clean():
  limpiarData('./Script/Conformers/')
  limpiarData('./Script/CsvFiles/')
  limpiarData('./Script/PDBFiles/')
  #limpiarData('./Script/PDBStructure/')
  limpiarData('./Script/SupFiles/')
  limpiarData('./Script/TextFiles/')
