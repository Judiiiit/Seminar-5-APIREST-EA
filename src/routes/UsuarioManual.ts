import express from 'express';
import controller from '../controllers/UsuarioManual';

const router = express.Router();

/**
 * @openapi
 * /manual/usuarios:
 *   post:
 *     summary: Crea un usuario manual
 *     tags:
 *       - Usuarios (vector manual)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - organization
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ana
 *               organization:
 *                 type: string
 *                 example: 65f123456789abcdef123456
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       404:
 *         description: Organización no encontrada
 */
router.post('/usuarios', controller.createUsuarioManual);

/**
 * @openapi
 * /manual/usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios manuales
 *     tags:
 *       - Usuarios (vector manual)
 *     responses:
 *       200:
 *         description: Lista de usuarios manuales
 */
router.get('/usuarios', controller.readUsuariosManual);

/**
 * @openapi
 * /manual/usuarios/{usuarioId}:
 *   get:
 *     summary: Obtiene un usuario manual por ID
 *     tags:
 *       - Usuarios (vector manual)
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario manual
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/usuarios/:usuarioId', controller.readUsuarioManual);

/**
 * @openapi
 * /manual/usuarios/{usuarioId}:
 *   put:
 *     summary: Actualiza un usuario manual
 *     tags:
 *       - Usuarios (vector manual)
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario manual
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               organization:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       404:
 *         description: Usuario u organización no encontrada
 */
router.put('/usuarios/:usuarioId', controller.updateUsuarioManual);

/**
 * @openapi
 * /manual/usuarios/{usuarioId}:
 *   delete:
 *     summary: Elimina un usuario manual
 *     tags:
 *       - Usuarios (vector manual)
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario manual
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/usuarios/:usuarioId', controller.deleteUsuarioManual);

export default router;