import express from 'express';
import controller from '../controllers/OrganizacionManual';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

/**
 * @openapi
 * /manual/organizaciones:
 *   post:
 *     summary: Crea una organización (vector manual)
 *     tags:
 *       - Organizaciones (vector manual)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Empresa Manual
 *     responses:
 *       201:
 *         description: Organización creada correctamente
 */
router.post('/organizaciones', controller.createOrganizacionManual);

/**
 * @openapi
 * /manual/organizaciones:
 *   get:
 *     summary: Obtiene todas las organizaciones (vector manual) con sus usuarios
 *     tags:
 *       - Organizaciones (vector manual)
 *     responses:
 *       200:
 *         description: Lista de organizaciones manuales
 */
router.get('/organizaciones', controller.getAllOrganizacionesManual);

/**
 * @openapi
 * /manual/organizaciones/{organizacionId}:
 *   get:
 *     summary: Obtiene una organización (vector manual) por ID
 *     tags:
 *       - Organizaciones (vector manual)
 *     parameters:
 *       - in: path
 *         name: organizacionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la organización manual
 *     responses:
 *       200:
 *         description: Organización encontrada
 *       404:
 *         description: Organización no encontrada
 */
router.get('/organizaciones/:organizacionId', controller.getOrganizacionManual);

/**
 * @openapi
 * /manual/organizaciones/{organizacionId}/usuarios:
 *   get:
 *     summary: Obtiene los usuarios de una organización (vector manual)
 *     tags:
 *       - Organizaciones (vector manual)
 *     parameters:
 *       - in: path
 *         name: organizacionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la organización manual
 *     responses:
 *       200:
 *         description: Usuarios obtenidos correctamente
 *       404:
 *         description: Organización no encontrada
 */
router.get('/organizaciones/:organizacionId/usuarios', controller.getUsuariosByOrganizacionManual);

/**
 * @openapi
 * /organizaciones/{organizacionId}:
 *   put:
 *     summary: Actualiza una organización por ID
 *     tags: [Organizaciones]
 *     parameters:
 *       - in: path
 *         name: organizacionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ObjectId de la organización
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrganizacionCreateUpdate'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organizacion'
 *       404:
 *         description: No encontrado
 *       422:
 *         description: Validación fallida (Joi)
 */
router.put('/:organizacionId', ValidateJoi(Schemas.organizacion.update), controller.updateOrganizacionManual);

/**
 * @openapi
 * /manual/organizaciones/{organizacionId}:
 *   delete:
 *     summary: Elimina una organización (vector manual)
 *     tags:
 *       - Organizaciones (vector manual)
 *     parameters:
 *       - in: path
 *         name: organizacionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la organización manual
 *     responses:
 *       200:
 *         description: Organización eliminada correctamente
 *       404:
 *         description: Organización no encontrada
 */
router.delete('/organizaciones/:organizacionId', controller.deleteOrganizacionManual);

export default router;