export type Query = Record<string, any>;

export type id = string | number;

export interface InventarioHabitacionService<T> {
    /**
     * Crea un nuevo objeto en la base de datos.
     * @param data Los datos del objeto a crear.
     * @param query (opcional) Una consulta adicional para filtrar o modificar la creación.
     * @returns Una promesa que se resuelve con el objeto creado.
     */
    create(data: Partial<T>, query?: Query): Promise<T>;

    /**
     * Obtiene una lista de objetos de la base de datos.
     * @param query (opcional) Una consulta adicional para filtrar o modificar la lista.
     * @returns Una promesa que se resuelve con la lista de objetos.
     */
    list(query?: Query): Promise<T[]>;

    /**
     * Obtiene un objeto de la base de datos por su identificador.
     * @param id El identificador del objeto a obtener.
     * @param query (opcional) Una consulta adicional para filtrar o modificar la obtención.
     * @returns Una promesa que se resuelve con el objeto obtenido o null si no se encuentra.
     */
    get(id: id, query?: Query): Promise<T>;

    /**
     * Actualiza un objeto en la base de datos.
     * @param id El identificador del objeto a actualizar.
     * @param data Los nuevos datos del objeto.
     * @param query (opcional) Una consulta adicional para filtrar o modificar la actualización.
     * @returns Una promesa que se resuelve con el objeto actualizado.
     */
    update(id: id, data: T, query?: Query): Promise<T>;

    /**
     * Elimina un objeto de la base de datos.
     * @param id El identificador del objeto a eliminar.
     * @param query (opcional) Una consulta adicional para filtrar o modificar la eliminación.
     * @returns Una promesa que se resuelve con el objeto eliminado o null si no se encuentra.
     */
    remove(id: id, query?: Query): Promise<T>;
}