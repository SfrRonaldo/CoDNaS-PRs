import conformaciones
from flask import Flask, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL
from flask_restful import Resource, Api, reqparse
import informacion_general
import informacion_estructural
import utils

app = Flask(__name__)
CORS(app)

# Configurar DB
app.config['MYSQL_HOST'] = 'codnas-prs.ckptsjkylhhm.us-east-1.rds.amazonaws.com'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'CwOqhZtemfZeqqWewJaR'
app.config['MYSQL_DB'] = 'codnas-prs'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)

api = Api(app)

class GetInfoGeneral(Resource):
  def get(self, pdb_id):
    try:
      _pdbId = pdb_id
      conn = mysql.connection
      cursor = conn.cursor()
      stmt = ("select * from info_general where pdb_id = %(pdb_id)s")
      cursor.execute(stmt, { 'pdb_id': _pdbId })
      data = cursor.fetchall()
      r = {
        'StatusCode': '200',
        'Message': 'Success',
        'InfoGeneral': data
      }
      return r
    except Exception as e:
      return { 'error': str(e) }

class GetConformacion(Resource):
  def get(self, pdb_id):
    try:
      _pdbId = pdb_id
      conn = mysql.connection
      cursor = conn.cursor()
      stmt = ("select num_regiones from info_general where pdb_id = %(pdb_id)s")
      cursor.execute(stmt, { 'pdb_id': _pdbId })
      data0 = cursor.fetchall()
      stmt = ("select conformero_1 as conformero, lim_inf_1 lim_inf, lim_sup_1 lim_sup, sec_similitud, rmsd, region from conformacion where conformero_2 = %(pdb_id)s")
      cursor.execute(stmt, { 'pdb_id': _pdbId })
      data1 = cursor.fetchall()
      stmt = ("select conformero_2 as conformero, lim_inf_2 lim_inf, lim_sup_2 lim_sup, sec_similitud, rmsd, region from conformacion where conformero_1 = %(pdb_id)s")
      cursor.execute(stmt, { 'pdb_id': _pdbId })
      data2 = cursor.fetchall()
      lista = []
      num_regiones = data0[0]['num_regiones']
      for i in range(num_regiones):
        sublista = []
        for j in data1:
          if (j['region'] == i+1):
            sublista.append(j)
        for j in data2:
          if (j['region'] == i+1):
            sublista.append(j)
        lista.append(sublista)
      r = {
        'StatusCode': '200',
        'Message': 'Success',
        'Conformacion': lista
      }
      return r
    except Exception as e:
      return { 'error': str(e) }

class GetInfoEstructural(Resource):
  def get(self, pdb_id):
    try:
      _pdbId = pdb_id
      conn = mysql.connection
      cursor = conn.cursor()
      stmt = ("select distinct conformero_1 conformer, lim_inf_1 lim_inf, lim_sup_1 lim_sup from conformacion where conformero_1 = %(pdb_id)s")
      cursor.execute(stmt, { 'pdb_id': _pdbId })
      data1 = cursor.fetchall()
      stmt = ("select distinct conformero_2 conformer, lim_inf_2 lim_inf, lim_sup_2 lim_sup from conformacion where conformero_2 = %(pdb_id)s")
      cursor.execute(stmt, { 'pdb_id': _pdbId })
      data2 = cursor.fetchall()
      lista = []
      for i in data1:
        if (i not in lista):
          lista.append(i)
      for i in data2:
        if (i not in lista):
          lista.append(i)
      stmt = ("select e.cluster, e.region, e.num_conformaciones, e.rmsd_min, e.rmsd_max, e.rmsd_avg from info_estructural e, info_general g where g.pdb_id = %(pdb_id)s and g.cluster = e.cluster")
      cursor.execute(stmt, { 'pdb_id': _pdbId })
      data3 = cursor.fetchall()
      r = {
        'StatusCode': '200',
        'Message': 'Success',
        'Regiones': lista,
        'InfoEstructural': data3
      }
      return r
    except Exception as e:
      return { 'error': str(e) }

class EstimarInfoGeneral(Resource):
  def get(self, pdb_id):
    try:
      _pdbId = pdb_id
      value = informacion_general.obtener(_pdbId)
      return value
    except Exception as e:
      return { 'error': str(e) }

class EstimarConformacion(Resource):
  def get(self, pdb_id):
    try:
      _pdbId = pdb_id[:6]
      conn = mysql.connection
      cursor = conn.cursor()
      #stmt = ("select conformero from conformacion where pdb_id = %(pdb_id)s")
      #cursor.execute(stmt, { 'pdb_id': _pdbId })
      #data = cursor.fetchall()
      #lista = []
      #for conformero in data:
      #  lista.append(conformero['conformero'])
      stmt = ("select conformero_1 as conformero, lim_inf_1 lim_inf, lim_sup_1 lim_sup, sec_similitud, rmsd from conformacion where conformero_2 = %(pdb_id)s")
      cursor.execute(stmt, { 'pdb_id': _pdbId })
      data1 = cursor.fetchall()
      stmt = ("select conformero_2 as conformero, lim_inf_2 lim_inf, lim_sup_2 lim_sup, sec_similitud, rmsd from conformacion where conformero_1 = %(pdb_id)s")
      cursor.execute(stmt, { 'pdb_id': _pdbId })
      data2 = cursor.fetchall()
      lista = []
      for i in data1:
        lista.append(i['conformero'])
      for i in data2:
        lista.append(i['conformero'])
      value = conformaciones.obtener(lista, pdb_id)
      return value
    except Exception as e:
      return { 'error': str(e) }

class EstimarInfoEstructural(Resource):
  def get(self, pdb_id):
    try:
      _pdbId = pdb_id
      value = informacion_estructural.obtener(_pdbId)
      return value
    except Exception as e:
      return { 'error': str(e) }

class Estimar(Resource):
  def get(self, pdb_id):
    try:
      _pdbId = pdb_id
      info_general = informacion_general.obtener(_pdbId)
      conn = mysql.connection
      cursor = conn.cursor()
      #stmt = ("select conformero from conformacion where pdb_id = %(pdb_id)s")
      #cursor.execute(stmt, { 'pdb_id': _pdbId[:6] })
      #data = cursor.fetchall()
      #lista = []
      #for conformero in data:
      #  lista.append(conformero['conformero'])
      stmt = ("select conformero_1 as conformero, lim_inf_1 lim_inf, lim_sup_1 lim_sup, sec_similitud, rmsd from conformacion where conformero_2 = %(pdb_id)s")
      cursor.execute(stmt, { 'pdb_id': _pdbId })
      data1 = cursor.fetchall()
      stmt = ("select conformero_2 as conformero, lim_inf_2 lim_inf, lim_sup_2 lim_sup, sec_similitud, rmsd from conformacion where conformero_1 = %(pdb_id)s")
      cursor.execute(stmt, { 'pdb_id': _pdbId })
      data2 = cursor.fetchall()
      lista = []
      for i in data1:
        lista.append(i['conformero'])
      for i in data2:
        lista.append(i['conformero'])
      conformacion = conformaciones.obtener(lista, _pdbId)
      info_estructural = informacion_estructural.obtener(_pdbId)
      response = {
        "info_general": info_general,
        "conformacion": conformacion,
        "info_estructural": info_estructural
      }
      return response
    except Exception as e:
      return { 'error': str(e) }

class GetAll(Resource):
  def get(self):
    try:
      conn = mysql.connection
      cursor = conn.cursor()
      stmt = ("select pdb_id, long_secuencia from info_general")
      cursor.execute(stmt)
      data = cursor.fetchall()
      lista_pdb = []
      lista_long_secuencia = []
      for i in data:
        lista_pdb.append(i['pdb_id'])
        lista_long_secuencia.append(i['long_secuencia'])
      res = {
        'lista': lista_pdb,
        'data': data,
        'long_secuencia': lista_long_secuencia
      }
      return res
    except Exception as e:
      return { 'error': str(e) }

class Limpiar(Resource):
  def get(self):
    try:
      utils.clean()
      return 'CLEAN!'
    except Exception as e:
      return { 'error': str(e) }

#class IsPR(Resource):
#  def get(self, pdb_id):
#    try:
#      _pdbId = pdb_id
#      conn = mysql.connection
#      cursor = conn.cursor()
#      stmt = ("select pdb_id from info_general where pdb_id = %(pdb_id)s")
#      cursor.execute(stmt, { 'pdb_id': _pdbId })
#      data = cursor.fetchall()
#      try:
#        if(data[0]['pdb_id'] == _pdbId):
#          return 1
#      except:
#        return 0
#    except Exception as e:
#      return { 'error': str(e) }

class GetLongSecuencia(Resource):
  def get(self, pdb_id):
    try:
      _pdbId = pdb_id
      conn = mysql.connection
      cursor = conn.cursor()
      stmt = ("select long_secuencia from info_general where pdb_id = %(pdb_id)s")
      cursor.execute(stmt, { 'pdb_id': _pdbId })
      data = cursor.fetchall()
      return data[0]['long_secuencia']
    except Exception as e:
      return { 'error': str(e) }

#api.add_resource(IsPR, '/api/IsPR/<pdb_id>')
api.add_resource(GetAll, '/api/GetAll')
api.add_resource(GetLongSecuencia, '/api/GetLongSecuencia/<pdb_id>')
api.add_resource(GetInfoGeneral, '/api/GetInfoGeneral/<pdb_id>')
api.add_resource(GetConformacion, '/api/GetConformacion/<pdb_id>')
api.add_resource(GetInfoEstructural, '/api/GetInfoEstructural/<pdb_id>')
api.add_resource(EstimarInfoGeneral, '/api/EstimarInfoGeneral/<pdb_id>')
api.add_resource(EstimarConformacion, '/api/EstimarConformacion/<pdb_id>')
api.add_resource(EstimarInfoEstructural, '/api/EstimarInfoEstructural/<pdb_id>')
api.add_resource(Estimar, '/api/Estimar/<pdb_id>')
api.add_resource(Limpiar, '/api/Limpiar/')

#if __name__ == '__main__':
#  app.run()
