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
      stmt = ("select * from conformacion where pdb_id = %(pdb_id)s")
      cursor.execute(stmt, { 'pdb_id': _pdbId })
      data = cursor.fetchall()
      r = {
        'StatusCode': '200',
        'Message': 'Success',
        'Conformacion': data
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
      stmt = ("select * from info_estructural where pdb_id = %(pdb_id)s")
      cursor.execute(stmt, { 'pdb_id': _pdbId })
      data = cursor.fetchall()
      r = {
        'StatusCode': '200',
        'Message': 'Success',
        'InfoEstructural': data
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
      stmt = ("select conformero from conformacion where pdb_id = %(pdb_id)s")
      cursor.execute(stmt, { 'pdb_id': _pdbId })
      data = cursor.fetchall()
      lista = []
      for conformero in data:
        lista.append(conformero['conformero'])
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
      stmt = ("select conformero from conformacion where pdb_id = %(pdb_id)s")
      cursor.execute(stmt, { 'pdb_id': _pdbId[:6] })
      data = cursor.fetchall()
      lista = []
      for conformero in data:
        lista.append(conformero['conformero'])
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
      stmt = ("select pdb_id from info_general")
      cursor.execute(stmt)
      data = cursor.fetchall()
      return data
    except Exception as e:
      return { 'error': str(e) }

class Limpiar(Resource):
  def get(self):
    try:
      utils.clean()
      return 'CLEAN!'
    except Exception as e:
      return { 'error': str(e) }

#@app.route('/')
#def index():
#    return app.send_static_file('index.html')

api.add_resource(GetAll, '/api/GetAll')
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
